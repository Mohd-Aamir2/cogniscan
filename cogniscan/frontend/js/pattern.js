const PATTERNS=[
  {s:[2,4,6,8],a:10,o:[9,10,12,14]},
  {s:[1,3,9,27],a:81,o:[54,81,36,64]},
  {s:[5,10,15,20],a:25,o:[22,30,25,35]},
  {s:[1,1,2,3,5],a:8,o:[7,8,9,10]},
  {s:[100,90,80,70],a:60,o:[50,65,60,55]}
];
function runPattern(box){
  return new Promise(done=>{
    let q=0,correct=0;
    (function show(){
      if(q>=PATTERNS.length)return done({score:correct/PATTERNS.length*100,details:{correct}});
      const p=PATTERNS[q];
      box.innerHTML=`<h2>4. Pattern Test (${q+1}/${PATTERNS.length})</h2><p>What number comes next?</p>
      <div class="seq">${p.s.join(' , ')} , ?</div><div class="options">${p.o.map(o=>`<button class="option" data-v="${o}">${o}</button>`).join('')}</div>`;
      box.querySelectorAll('.option').forEach(b=>b.onclick=()=>{if(+b.dataset.v===p.a)correct++;q++;show()});
    })();
  });
}
