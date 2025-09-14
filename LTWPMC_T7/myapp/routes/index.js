var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index1.ejs', 
  { 
    tieude: 'Chơi Game' ,
    noidung:'game subaway',
    giatien: 200,
    nguoichoi:['bot','Ngo','bap cai']
  }
  );
});

module.exports = router;
