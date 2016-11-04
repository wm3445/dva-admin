'use strict';

const qs = require('qs');
const mockjs = require('mockjs');



module.exports = {

  'GET /api/menus' (req, res) {
    const data =[
      {
        key: 1,
        name: 'Dashboard',
        icon: 'user',
        child: [
          {
            name: '系统',
            key: 101,
            child: [
              {
                name: '用户管理',
                key: 'users'
              },
              {
                name: '首页',
                key: 'home'
              }
            ]
          }
        ]
      },
      {
        key: 2,
        name: 'Dashboard',
        icon: 'setting',
        child: [
          {
            name: '系统',
            key: 202,
            child: [
              {
                name: '用户管理',
                key: 'users1'
              },
              {
                name: '首页',
                key: 'home1'
              }
            ]
          }
        ]
      }
    ]
    setTimeout(function () {
      res.json(data);
    }, 500);
  },



};
