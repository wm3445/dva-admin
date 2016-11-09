import {getAllMenu} from '../services/main_layout'
import _ from "lodash"
import { parse } from 'qs';


export default {
  namespace: 'menus',
  state: {
    items: [],
    collapse :true,
    navpath: []
  },
  effects: {
    *getAllMenu({payload},{call,put}){
      const { data } = yield call(getAllMenu, parse(payload));
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
      return {...state,items:action.payload}
    },
    updateNavPath(state,action){

      let navpath = [], tmpOb, tmpKey, child,findSource;
      if(action.payload.data){
        findSource = state.items;
        action.payload.data.reverse().map((item)=>{
          tmpKey = item;
          tmpOb = _.find(findSource, function(o) {
            return o.key == tmpKey;
          });
          if(tmpOb.child){
            findSource =  tmpOb.child;

          }
          if(tmpOb){
            navpath.push({
              key: tmpOb.key,
              name: tmpOb.name
            })
          }
        })
      }
      return {...state,navpath:navpath}
    }
  }


}
