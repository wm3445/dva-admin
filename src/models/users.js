// ./src/models/users.js

//import { create, remove, update, query } from '../services/users';
import { parse } from 'qs';

import { query,create,remove,update } from '../services/users';


export default {
  namespace: 'users',

  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    visible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },
  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
          },
        });
      }
    },
    *create({ payload }, { call, put }){
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload,
        });
      }
    },
    *'delete'({ payload }, { call, put }){
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, {id:payload});
      if (data && data.success) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
      }
    },
    *update({ payload }, { select,call, put }){
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },
  },
  reducers: {
    showLoading(state,action){
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    showModal(state,action){
      return {...state,...action.payload,visible:true}
    }, // 控制 Modal 显示状态的 reducer
    hideModal(state){
      return {...state,visible:false}
    },
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(state,action){
      const newUser = action.payload;
      return { ...state, list: [newUser, ...state.list], loading: false };
    },
    deleteSuccess(state,action){
      const id = action.payload;
      const newList = state.list.filter(user => user.id !== id);
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state,action){
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    }
  }
}
