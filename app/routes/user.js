const express = require('express');
const UserCtrl = require('../controllers/UserController');

const Router = express.Router();
Router .post('/Save',UserCtrl.Save)   //api/user/ => Save
       .get('/GetData/:param1/:param2',UserCtrl.FindExp,UserCtrl.FindBy) //api/user/  => FindBy
       .get('/FindByParam',UserCtrl.FindAdvance,UserCtrl.FindByParam) //api/user/  => FindByParam
       .delete('/Delete/:key/:value',UserCtrl.Find,UserCtrl.Remove); //api/user/  => Delete

module.exports = Router;