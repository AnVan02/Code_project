var express = require('express');
var router = express.Router();


function Menu(u,i){
  this.TheLoai = u;
  this.LoaiTin=i;
}

var item1 = new Menu('Home',['naru','sono'])
var item2 = new Menu('Profile',['Change Information','Change Password'])
var item3 = new Menu('Setting',['kali','photpho'])

var arrayMenu = [item,item1,item2,item3 ]

router.get('/',function(req,res,next){
  res.render('index', {menu:arrayMenu});
});

module.exports = router;


