const m=require('mongoose');
module.exports=m.model('Assessment',new m.Schema({
  patient:{type:m.Schema.Types.ObjectId,ref:'Patient',index:true},
  assessmentNumber:Number,
  memory:Number,attention:Number,reaction:Number,pattern:Number,
  reactionMs:Number,
  overallScore:Number
},{timestamps:true}));
