import {login} from '../services/login'
import {parse} from 'qs';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'login',
  state: {
    loginInfo: null,//登录携带信息
    loggingIn: false,//是否点击登录
    loggingOut: false,//是否点击登出
    loginErrors: null,//提示信息
    uid: null
  },
  effects: {

    *loginForm({payload}, {call, put}){

      yield put({type: 'loginPending'});
      const {data} =   yield call(login, payload);
      if (data && data.success) {
        document.cookie = "uid=1";
        //yield put(routerRedux.push('/home'))
        yield put({
          type: 'loginSuccess',
          payload: data
        })
      } else {
        yield put({
          type: 'loginFail',
          payload: "登陆错误"
        })
      }

    },
    *loginOut({payload}, {call, put}){
      document.cookie = "uid=;expires="+(new Date(0)).toGMTString();
      yield put({
        type: 'loginOutSuccess'
      })
      yield put(routerRedux.push('/login'))

    }
  },
  reducers: {
    loginPending(state, action){


      return {...state, loggingIn: true, loginErrors: null}
    },
    loginSuccess(state, action){
      return {...state, loginInfo: action.payload, loggingIn: false, loginErrors: null}
    },
    loginFail(state, action){


      return {...state, loginInfo: null, loggingIn: false, loginErrors: action.payload}
    },
    defaultState(state, action){
      return {...state}
    },
    loginOutSuccess(state, action){
      return {...state,loginInfo: null}
    }
  }


}
