import {login} from '../services/login'
import { parse } from 'qs';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
    loginInfo: null,
    loggingIn: false,
    loggingOut: false,
    loginErrors :null,
    uid:null
  },
  effects: {
    *login({payload},{call,put}){
      const { data } = yield call(login,payload);
      if(data && data.success){
        yield put({
          type: 'loginSuccess',
          payload: data
        });
       // yield put(routerRedux.push('/home'))
      } else {
        yield put({
          type: 'loginFail',
          payload: data
        });
      }
    }
  },
  reducers: {
    loginSuccess(state,action){

      return {...state,user:action.payload.user,loggingIn:false,loginErrors:null}
    },
    loginFail(state,action){
      return {...state,loggingIn: false, user: null, loginErrors: action.payload.msg}
    }
  }


}
