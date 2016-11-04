import {getAllMenu} from '../services/main_layout'
import { parse } from 'qs';


export default {
  namespace: 'menus',
  state: {
    items: [],
    collapse :true
  },
  effects: {
    *getAllMenu({payload},{call,put}){
      const { data } = yield call(getAllMenu, parse(payload));
      console.log("data",data)
      if (data) {
        yield put({
          type: 'getAllMenuSuccess',
          payload: data
        });
      }
    }
  },
  reducers: {
    getAllMenuSuccess(state,action){
      console.log("state",action)
      return {...state,items:action.payload}
    }
  }


}
