requireAuth();
(async()=>{
  const box=document.getElementById('game'),bar=document.getElementById('bar');
  const steps=[['memory',runMemory],['attention',runAttention],['reaction',runReaction],['pattern',runPattern]];
  const out={details:{}};
  for(let i=0;i<steps.length;i++){
    bar.style.width=(i/steps.length*100)+'%';
    const r=await steps[i][1](box);
    out[steps[i][0]]=Math.round(r.score);out.details[steps[i][0]]=r.details;
    if(r.ms)out.reactionMs=r.ms;
  }
  bar.style.width='100%';box.innerHTML='<h2>Saving results…</h2>';
  try{const a=await api('/assessments','POST',out);location.href='result.html?id='+a._id}
  catch(e){box.innerHTML='<p class="error">'+e.message+'</p>'}
})();
