const r=require('express').Router(),c=require('../controllers/assessmentController'),{protect}=require('../controllers/authController');
r.use(protect);r.post('/',c.create);r.get('/',c.list);r.get('/:id',c.getOne);
module.exports=r;
