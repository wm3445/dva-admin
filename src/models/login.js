import {login} from '../services/login'
import { parse } from 'qs';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
    loginInfo: null,//登录携带信息
    loggingIn: false,//是否点击登录
    loggingOut: false,//是否点击登出
    loginErrors :null,//提示信息
    uid:null
  },
  effects: {
    *login({payload},{call,put}){
      yield put({type: 'loginPending'});
      const { data } = yield call(login,payload);
      if(data && data.success){
        yield put({
          type: 'loginSuccess',
          payload: data
        });
        document.cookie = 'uid='+data.user
      } else {
        yield put({
          type: 'loginFail',
          payload: data
        });
      }
    }
  },
  reducers: {
    loginPending(state,action){
      return {...state,loggingIn:true,loginErrors:null,loginInfo:null}
    },
    loginSuccess(state,action){

      return {...state,loginInfo:true,loggingIn:false,loginErrors:null}
    },
    loginFail(state,action){

      return {...state,loggingIn: false, loginInfo: null, loginErrors: action.payload.msg}
    }
  }


}
