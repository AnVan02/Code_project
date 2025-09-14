var express = require('express');
var router = express.Router();
const homeController= require('../controllers/homeController');


/* GET users listing. */
const initRoutes = ()=>{
  router.get('/',homeController.getHomePage);
  //router.get('/xem',homeController.getAllUsers);

  //router.get('/xem',homeController.getAllUsers);
  //router.post('/them',homeController.postAllUsers);

  //router.get('/sua',homeController.getEditUsers);
  //router.post('/sua',homeController.postEditUsers);


  //router.get('/xoa',homeController.getDeleteUsers);
  //router.post('/xoa',homeController.posDeleteUsers);

}


module.exports = {initRoutes,router};
