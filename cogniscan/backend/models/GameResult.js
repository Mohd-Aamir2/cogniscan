const m=require('mongoose');
module.exports=m.model('GameResult',new m.Schema({
  assessment:{type:m.Schema.Types.ObjectId,ref:'Assessment',index:true},
  game:String,score:Number,details:Object
},{timestamps:true}));
