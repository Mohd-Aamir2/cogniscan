const Assessment=require('../models/Assessment'),GameResult=require('../models/GameResult');
const clamp=v=>Math.max(0,Math.min(100,Math.round(Number(v)||0)));
exports.create=async(req,res)=>{
  try{
    const b=req.body;
    const s={memory:clamp(b.memory),attention:clamp(b.attention),reaction:clamp(b.reaction),pattern:clamp(b.pattern)};
    const overallScore=Math.round(s.memory*.3+s.attention*.25+s.reaction*.2+s.pattern*.25);
    const n=await Assessment.countDocuments({patient:req.patient._id})+1;
    const a=await Assessment.create({patient:req.patient._id,assessmentNumber:n,...s,reactionMs:b.reactionMs,overallScore});
    await GameResult.insertMany(Object.keys(s).map(g=>({assessment:a._id,game:g,score:s[g],details:(b.details||{})[g]})));
    res.status(201).json(a);
  }catch(e){res.status(500).json({message:e.message})}
};
exports.list=async(req,res)=>res.json(await Assessment.find({patient:req.patient._id}).sort({assessmentNumber:1}));
exports.getOne=async(req,res)=>{
  const a=await Assessment.findOne({_id:req.params.id,patient:req.patient._id}).catch(()=>null);
  a?res.json(a):res.status(404).json({message:'Not found'});
};
