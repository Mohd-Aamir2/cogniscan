const m=require('mongoose');
module.exports=m.model('User',new m.Schema({
  email:{type:String,required:true,unique:true,lowercase:true},
  password:{type:String,required:true}
},{timestamps:true}));
