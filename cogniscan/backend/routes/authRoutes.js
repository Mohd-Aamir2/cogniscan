const r=require('express').Router(),c=require('../controllers/authController');
r.post('/register',c.register);r.post('/login',c.login);r.post('/logout',c.logout);r.get('/profile',c.protect,c.profile);
module.exports=r;
