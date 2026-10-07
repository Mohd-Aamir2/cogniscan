const WORDS=["APPLE","BOOK","RIVER","CHAIR","MOUNTAIN"],DISTRACT=["HOUSE","DOG","PEN","TABLE","PHONE"];
function runMemory(box){
  return new Promise(done=>{
    box.innerHTML=`<h2>1. Memory Test</h2><p>Remember these five words.</p>
    <div class="words">${WORDS.map(w=>`<div class="word">${w}</div>`).join('')}</div><button id="ready">I'M READY</button>`;
    document.getElementById('ready').onclick=()=>{
      const all=[...WORDS,...DISTRACT].sort(()=>Math.random()-.5);
      box.innerHTML=`<h2>Memory Recall</h2><p>Select the words you remember.</p>
      <div class="options">${all.map(w=>`<button class="option" data-w="${w}">${w}</button>`).join('')}</div><button id="sub">SUBMIT</button>`;
      box.querySelectorAll('.option').forEach(b=>b.onclick=()=>b.classList.toggle('selected'));
      document.getElementById('sub').onclick=()=>{
        const sel=[...box.querySelectorAll('.option.selected')].map(b=>b.dataset.w);
        const hits=sel.filter(w=>WORDS.includes(w)).length,wrong=sel.length-hits;
        done({score:Math.max(0,hits*20-wrong*10),details:{hits,wrong}});
      };
    };
  });
}
