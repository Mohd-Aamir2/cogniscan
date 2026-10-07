require('dotenv').config();
const express=require('express'),cors=require('cors'),path=require('path');
const app=express();
app.use(cors());app.use(express.json());
app.use('/api',require('./routes/authRoutes'));
app.use('/api/assessments',require('./routes/assessmentRoutes'));
app.use('/api/patients',require('./routes/patientRoutes'));
app.use(express.static(path.join(__dirname,'../frontend')));
require('./config/db')().then(()=>app.listen(process.env.PORT||5000,()=>console.log('Open http://localhost:'+(process.env.PORT||5000))))
  .catch(e=>{console.error('DB error:',e.message);process.exit(1)});
