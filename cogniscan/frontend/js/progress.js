requireAuth();
const DOMAINS=[['memory','🧠 Memory','#2e9d6a'],['attention','👁️ Attention','#d98b1f'],['reaction','⚡ Reaction','#c2417a'],['pattern','🧩 Pattern','#6b5bd6']];
const sign=n=>(n>0?'+':'')+n;
const badge=d=>`<span class="badge ${d>0?'up':d<0?'down':'flat'}">${d>0?'▲':d<0?'▼':'●'} ${sign(d)}</span>`;
(async()=>{
  const list=await api('/assessments');
  if(!list.length){document.getElementById('empty').classList.remove('hidden');return}
  document.getElementById('content').classList.remove('hidden');

  const f=list[0],l=list[list.length-1],scores=list.map(a=>a.overallScore);
  const d=l.overallScore-f.overallScore;
  document.getElementById('best').textContent=Math.max(...scores);
  document.getElementById('avg').textContent=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
  const de=document.getElementById('delta');
  if(list.length>1){de.textContent=(d>=0?'▲ ':'▼ ')+sign(d);de.className=d>=0?'up':'down'}else de.textContent='Baseline';

  document.getElementById('chips').innerHTML=DOMAINS.map(([k,n])=>{
    const dd=l[k]-f[k];
    return `<div class="chip"><div><small>${n}</small><span class="val">${l[k]}</span></div>${list.length>1?badge(dd):'<span class="badge flat">baseline</span>'}</div>`;
  }).join('');

  const box=document.getElementById('insight'),t=document.getElementById('trend'),tt=document.getElementById('insightTitle');
  if(list.length<2){tt.textContent='Baseline recorded';t.textContent='Complete at least 2 assessments to see a trend.'}
  else{
    const top=DOMAINS.map(([k,n])=>({n:n.split(' ')[1],d:l[k]-f[k]})).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d))[0];
    box.className='insight '+(d>=3?'good':d<=-3?'warn':'');
    tt.textContent=d>=3?'📈 Improving trend':d<=-3?'📉 Score has dropped':'➡️ Stable';
    t.textContent=`Overall score ${d<0?'decreased':d>0?'increased':'stayed the same'} from ${f.overallScore} to ${l.overallScore} across ${list.length} assessments. Largest change: ${top.n} (${sign(top.d)}). This is a screening observation, not a diagnosis.`;
  }

  const ctx=document.getElementById('chart').getContext('2d');
  const grad=ctx.createLinearGradient(0,0,0,300);grad.addColorStop(0,'rgba(36,59,122,.35)');grad.addColorStop(1,'rgba(36,59,122,0)');
  const line=(k,label,color)=>({label,data:list.map(a=>a[k]),borderColor:color,backgroundColor:color,tension:.35,borderWidth:2,borderDash:[5,4],pointRadius:3,fill:false});
  new Chart(ctx,{type:'line',
    data:{labels:list.map(a=>'A'+a.assessmentNumber),datasets:[
      {label:'Overall',data:scores,borderColor:'#243b7a',backgroundColor:grad,fill:true,tension:.35,borderWidth:4,pointRadius:6,pointHoverRadius:8,pointBackgroundColor:'#fff',pointBorderColor:'#243b7a',pointBorderWidth:3},
      ...DOMAINS.map(([k,n,c])=>line(k,n.split(' ')[1],c))]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      scales:{y:{min:0,max:100,grid:{color:'#eef1f6'},ticks:{stepSize:20}},x:{grid:{display:false}}},
      plugins:{legend:{position:'bottom',labels:{usePointStyle:true,boxWidth:8,padding:16}},tooltip:{padding:12,cornerRadius:10}}}});
})();