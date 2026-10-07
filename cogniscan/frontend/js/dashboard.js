requireAuth();
(async()=>{
  const p=await api('/profile');
  document.getElementById('hello').textContent='Hello, '+p.patient.name.split(' ')[0]+' 👋';
  const list=await api('/assessments');
  document.getElementById('count').textContent=list.length;
  const l=list[list.length-1],pr=list[list.length-2],ch=document.getElementById('change');
  document.getElementById('latest').textContent=l?l.overallScore:'—';
  if(l&&pr){const d=l.overallScore-pr.overallScore;ch.textContent=(d>=0?'▲ +':'▼ ')+d;ch.className=d>=0?'up':'down'}
  else ch.textContent=l?'Baseline':'—';
  if(l)['memory','attention','reaction','pattern'].forEach(k=>{
    document.getElementById('b_'+k).style.width=l[k]+'%';
    document.getElementById('v_'+k).textContent=l[k]+'/100';
  });
})();