const bcrypt=require('bcryptjs'),jwt=require('jsonwebtoken');
const User=require('../models/User'),Patient=require('../models/Patient');
const SECRET=()=>process.env.JWT_SECRET||'dev_secret';
const sign=id=>jwt.sign({id},SECRET(),{expiresIn:'7d'});
exports.protect=async(req,res,next)=>{
  try{
    const t=(req.headers.authorization||'').replace('Bearer ','');
    const {id}=jwt.verify(t,SECRET());
    req.user=await User.findById(id);
    req.patient=await Patient.findOne({user:id});
    if(!req.user||!req.patient)throw 0;
    next();
  }catch{res.status(401).json({message:'Not authorized'})}
};
exports.register=async(req,res)=>{
  try{
    const {email,password,name,age,education,language}=req.body;
    if(!email||!password||!name||password.length<6)return res.status(400).json({message:'Name, email and 6+ char password required'});
    if(await User.findOne({email}))return res.status(400).json({message:'Email already registered'});
    const user=await User.create({email,password:await bcrypt.hash(password,10)});
    await Patient.create({user:user._id,name,age,education,language});
    res.status(201).json({token:sign(user._id)});
  }catch(e){res.status(500).json({message:e.message})}
};
exports.login=async(req,res)=>{
  const user=await User.findOne({email:(req.body.email||'').toLowerCase()});
  if(!user||!(await bcrypt.compare(req.body.password||'',user.password)))return res.status(400).json({message:'Invalid email or password'});
  res.json({token:sign(user._id)});
};
exports.logout=(req,res)=>res.json({message:'Logged out (delete token on client)'});
exports.profile=(req,res)=>res.json({email:req.user.email,patient:req.patient});
