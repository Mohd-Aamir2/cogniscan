const r=require('express').Router(),c=require('../controllers/patientController'),{protect}=require('../controllers/authController');
r.use(protect);r.get('/me',c.getMe);r.put('/me',c.updateMe);
module.exports=r;
