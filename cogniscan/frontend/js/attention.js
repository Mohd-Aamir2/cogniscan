function runAttention(box){
  return new Promise(done=>{
    box.innerHTML=`<h2>2. Attention Test</h2><p>Tap the box <b>only</b> when you see the letter <b>X</b>.</p>
    <div id="letter" class="tap">READY</div><button id="go">START</button>`;
    const L=document.getElementById('letter');
    document.getElementById('go').onclick=e=>{
      e.target.classList.add('hidden');
      const N=15,
            seq=Array.from({length:N},()=>Math.random()<.4?'X':['O','K','T','A'][Math.floor(Math.random()*4)]);
      let i=0,fa=0,timer=null,gapTimer=null,answered=true,finished=false,shownAt=0;

      function finish(hit,reactionMs){
        if(finished) return;
        finished=true;
        clearTimeout(timer); clearTimeout(gapTimer);
        L.onclick=null;
        L.textContent='DONE';
        done({
          score: hit ? Math.max(0,100-fa*10) : 0,
          details:{hit,falseAlarms:fa,reactionMs:reactionMs??null,lettersShown:i+(hit?1:0)}
        });
      }

      function endTrial(){          // letter khatam, gap, phir agla
        clearTimeout(timer);
        answered=true;
        L.textContent='+';
        i++;
        gapTimer=setTimeout(next,400);
      }

      L.onclick=()=>{
        if(answered||finished) return;
        answered=true;
        if(seq[i]==='X'){
          finish(true,Math.round(performance.now()-shownAt));  // X par tap = test stop
        }else{
          fa++;                      // galat letter par tap = false alarm, test chalta rahega
          endTrial();
        }
      };

      function next(){
        if(finished) return;
        if(i>=N){ finish(false); return; }   // poore letters me X par tap hi nahi hua
        answered=false;
        L.textContent=seq[i];
        shownAt=performance.now();
        timer=setTimeout(endTrial,900);      // tap nahi hua to aage badho
      }
      next();
    };
  });
}