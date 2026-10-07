const m=require('mongoose');
module.exports=m.model('Patient',new m.Schema({
  user:{type:m.Schema.Types.ObjectId,ref:'User',unique:true},
  name:{type:String,required:true},
  age:{type:Number,min:1,max:120},
  education:{type:String,default:'Graduate'},
  language:{type:String,default:'English'}
},{timestamps:true}));
