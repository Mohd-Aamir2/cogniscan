exports.getMe=(req,res)=>res.json(req.patient);
exports.updateMe=async(req,res)=>{
  const {name,age,education,language}=req.body;
  Object.assign(req.patient,{name,age,education,language});
  await req.patient.save();res.json(req.patient);
};
