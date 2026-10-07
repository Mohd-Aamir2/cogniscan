requireAuth();
(async()=>{
  const list=(await api('/assessments')).reverse();
  document.getElementById('rows').innerHTML=list.length?list.map(a=>`<tr onclick="location.href='result.html?id=${a._id}'" style="cursor:pointer">
    <td>#${a.assessmentNumber}</td><td>${new Date(a.createdAt).toLocaleDateString()}</td><td>${a.memory}</td><td>${a.attention}</td><td>${a.reaction}</td><td>${a.pattern}</td><td><b>${a.overallScore}</b></td></tr>`).join('')
    :'<tr><td colspan="7">No assessments yet.</td></tr>';
})();
