'use strict';
const qs = require('qs');



module.exports = {

  'POST /api/login': function (req, res) {
    console.log("post")
    const info = qs.parse(req.body);
    let success = false;
    let msg = '账号或者密码错误！';
    let data  = null
    let uid = null;
    console.log(info.username+"   "+info.password)

    if(info.username==='admin' && info.password ==='123456'){
      msg = null
      success = true;
      data = info;
      uid = info.username;
      console.log("登陆成功")
    }
    setTimeout(function () {

      res.json({
        success :success,
        user:info,
        msg :msg
      });
    }, 500);
  },

};
