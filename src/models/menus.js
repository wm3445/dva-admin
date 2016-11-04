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
    },
    updateNavPath(state,action){
      console.log("action",action.payload.data.reverse())

      let navpath = [], tmpOb, tmpKey, child,findSource;
      if(action.payload.data){
        findSource = state.items;
        action.payload.data.map((item)=>{
          console.log("item",item);
          tmpKey = item;
          tmpOb = _.find(findSource, function(o) {
            console.log(o.key+"   "+tmpKey)
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
          console.log("navpath",navpath)
        })
      }
      return {...state,navpath:navpath}
    }
  }


}
