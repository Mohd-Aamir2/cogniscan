function runReaction(box){
  return new Promise(done=>{
    box.innerHTML=`<h2>3. Reaction Time</h2><p>When the box turns green, tap it as fast as you can. 3 rounds.</p>
    <div id="rb" class="tap">TAP TO BEGIN</div><p id="rr" class="small"></p>`;
    const rb=document.getElementById('rb'),rr=document.getElementById('rr'),times=[];let t0=0,timer=null,state='idle';
    function round(){
      state='wait';rb.className='tap';rb.textContent='WAIT…';
      timer=setTimeout(()=>{state='go';rb.className='tap go';rb.textContent='TAP NOW!';t0=performance.now()},1000+Math.random()*2500);
    }
    rb.onclick=()=>{
      if(state==='idle')return round();
      if(state==='wait'){clearTimeout(timer);rb.className='tap early';rb.textContent='Too early! Wait for green';state='idle';setTimeout(round,1200);return}
      if(state==='go'){
        const ms=Math.round(performance.now()-t0);times.push(ms);rr.textContent='Times: '+times.join(' ms, ')+' ms';state='idle';
        if(times.length>=3){
          const avg=Math.round(times.reduce((a,b)=>a+b)/3);
          return done({score:Math.max(0,Math.min(100,Math.round(120-(avg-250)/8))),ms:avg,details:{times,avg}});
        }
        rb.textContent='Good! Next round…';setTimeout(round,900);
      }
    };
  });
}
