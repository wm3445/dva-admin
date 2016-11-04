// request 是我们封装的一个网络请求库
import request from '../utils/request';
import qs from 'qs';

export async function vaildLogin(params) {
  return request(`/api/login?${qs.stringify(params)}`,{
    method: "POST",
    body: qs.stringify(params)
  });
}
