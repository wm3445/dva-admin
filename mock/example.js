'use strict';

module.exports = {

  'GET /api/example': function (req, res) {
    setTimeout(function () {
      console.log(22222)
      res.json({
        success: true,
        data: ['foo', 'bar'],
      });
    }, 500);
  },

};
