function runAttention(box){
  return new Promise(done=>{
    box.innerHTML=`<h2>2. Attention Test</h2><p>Tap the box <b>only</b> when you see the letter <b>X</b>.</p>
    <div id="letter" class="tap">READY</div><button id="go">START</button>`;
    const L=document.getElementById('letter');
    document.getElementById('go').onclick=e=>{
      e.target.classList.add('hidden');
      const N=15,seq=Array.from({length:N},()=>Math.random()<.4?'X':['O','K','T','A'][Math.floor(Math.random()*4)]);
      let i=0,tapped=false,hits=0,fa=0;
      L.onclick=()=>{tapped=true};
      (function next(){
        if(i>=N){L.onclick=null;L.textContent='DONE';
          const nx=seq.filter(s=>s==='X').length||1;
          return done({score:Math.max(0,Math.round(hits/nx*100-fa*10)),details:{hits,falseAlarms:fa,targets:nx}})}
        tapped=false;L.textContent=seq[i];
        setTimeout(()=>{
          if(seq[i]==='X'&&tapped)hits++;else if(seq[i]!=='X'&&tapped)fa++;
          L.textContent='+';i++;setTimeout(next,400);
        },900);
      })();
    };
  });
}
