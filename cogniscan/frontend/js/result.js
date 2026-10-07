requireAuth();
function band(t){return t>=75?"Lower screening concern":t>=55?"Consider reassessment":"Further clinical assessment may be considered"}
(async()=>{
  const id=new URLSearchParams(location.search).get('id');
  const list=await api('/assessments');
  const idx=id?list.findIndex(a=>a._id===id):list.length-1;
  const a=list[idx];
  if(!a){document.getElementById('summary').textContent='No assessment found.';return}
  document.getElementById('score').textContent=a.overallScore;
  document.getElementById('risk').textContent=band(a.overallScore);
  [['memory','Memory'],['attention','Attention'],['reaction','Reaction'],['pattern','Pattern']].forEach(([k,n])=>{
    document.getElementById('metrics').insertAdjacentHTML('beforeend',
    `<div class="metric"><div class="metric-head"><b>${n}</b><span>${a[k]}/100</span></div><div class="track"><div class="fill" style="width:${a[k]}%"></div></div></div>`);
  });
  const prev=list[idx-1];
  document.getElementById('summary').innerHTML=prev
    ?`Compared with assessment #${prev.assessmentNumber}: overall <span class="${a.overallScore>=prev.overallScore?'up':'down'}">${a.overallScore-prev.overallScore>=0?'+':''}${a.overallScore-prev.overallScore}</span> points.`
    :'This is your first assessment — it will be used as your baseline.';
})();
