const API='/api';
const token=()=>localStorage.getItem('cs_token');
async function api(path,method='GET',body){
  const r=await fetch(API+path,{method,headers:{'Content-Type':'application/json',...(token()&&{Authorization:'Bearer '+token()})},body:body?JSON.stringify(body):undefined});
  const d=await r.json().catch(()=>({}));
  if(r.status===401&&token())logout();
  if(!r.ok)throw new Error(d.message||'Request failed');
  return d;
}
function requireAuth(){if(!token())location.href='login.html'}
function logout(){localStorage.removeItem('cs_token');location.href='login.html'}
function bindForm(id,path){
  const f=document.getElementById(id);if(!f)return;
  f.onsubmit=async e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(f));
    try{const d=await api(path,'POST',data);localStorage.setItem('cs_token',d.token);location.href='dashboard.html'}
    catch(err){document.getElementById('err').textContent=err.message}
  };
}
bindForm('loginForm','/login');bindForm('registerForm','/register');
