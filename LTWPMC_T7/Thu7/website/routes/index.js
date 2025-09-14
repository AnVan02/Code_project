var express = require('express');
var router = express.Router();
var nhanvien=require('../models/nhanvien.js')

/* GET home page. */
// thêm
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/them', function(req, res, next) {
  res.render('them.ejs');
});
router.post('/them', function(req, res, next) {
  var nv=new nhanvien({
    name:req.body.txtTen,
    age:req.body.txtTuoi
  })
  nv.save(arr=>res.redirect('/them'))
});
//sửa
router.get('/sua', function(req, res, next) {
  res.render('sua.ejs');
});

router.post('/sua', function(req, res, next){
  nhanvien.findOne({
    name: req.body.txtTen
  },
  (err,nv) => {
    nv.age=req.body.txtTuoi
    nv.save(err => res.redirect('/sua'))
  })
});
// xoá
router.get('/xoa/:maso', function(req, res, next) {
  nhanvien.deleteOne({_id: req.params.maso},
    err => res.redirect('/xem'))
});

router.post('/xoa', function(req, res, next){
  nhanvien.deleteOne
});
router.get('/xem',function(req,res,next){
  nhanvien.find({},(error,dsnv)=>{
    res.render('xem.ejs',{dsnv});
  })
});
router.get('/',function(req,res,next){
  res.render('trangchu.ejs');
});

module.exports = router;


