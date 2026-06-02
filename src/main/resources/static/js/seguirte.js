
// ── LOCAL XP ──
function todayKeyLocal(){
  const d=new Date();
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}
function getLocalXP(){
  return parseInt(localStorage.getItem('seguirte_xp') || '0');
}
function addLocalXP(amount){
  const cur = getLocalXP();
  const next = cur + amount;
  localStorage.setItem('seguirte_xp', next);
  document.querySelectorAll('[data-xp-display]').forEach(el => el.textContent = next);
  const pct = next % 100;
  const bar = document.getElementById('heroXpBar');
  if(bar) bar.style.width = pct + '%';
  const ring = document.getElementById('levelRing');
  if(ring) ring.style.strokeDashoffset = 251.2*(1-pct/100);
}

// ── AUDIO ENGINE ──
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx;
function getCtx(){if(!ctx){ try{ ctx=new AudioCtx(); }catch(e){} } return ctx;}

function beep(freq=440, type='sine', duration=0.12, gain=0.18){
  const a=getCtx(); if(!a)return;
  const o=a.createOscillator(), g=a.createGain();
  o.connect(g); g.connect(a.destination);
  o.frequency.value=freq; o.type=type;
  g.gain.setValueAtTime(gain,a.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+duration);
  o.start(); o.stop(a.currentTime+duration);
}

function playSuccess(){
  beep(523,'sine',0.1,0.2);
  setTimeout(()=>beep(659,'sine',0.1,0.2),100);
  setTimeout(()=>beep(784,'sine',0.18,0.25),200);
  setTimeout(()=>beep(1047,'sine',0.22,0.3),320);
}
function playClick(){ beep(800,'sine',0.06,0.12); }
function playError(){
  beep(220,'sawtooth',0.18,0.12);
  setTimeout(()=>beep(180,'sawtooth',0.18,0.12),130);
}
function playLevelUp(){
  [523,659,784,1047,1319].forEach((f,i)=>{
    setTimeout(()=>beep(f,'sine',0.15,0.3),i*100);
  });
}
function playXP(){
  beep(1200,'sine',0.08,0.15);
  setTimeout(()=>beep(1400,'sine',0.08,0.12),80);
}

// ── XP FLOAT ANIMATION ──
function floatXP(amount, x, y){
  const el=document.createElement('div');
  el.className='xp-float';
  el.textContent=`+${amount} XP ⚡`;
  el.style.left=(x||window.innerWidth/2-40)+'px';
  el.style.top=(y||window.innerHeight/2)+'px';
  document.body.appendChild(el);
  playXP();
  for(let i=0;i<5;i++){
    const s=document.createElement('div');
    s.className='star-burst';
    s.textContent=['⭐','✨','💫','🌟','⚡'][i];
    s.style.left=(x||window.innerWidth/2)+'px';
    s.style.top=(y||window.innerHeight/2)+'px';
    const angle=Math.random()*360;
    const dist=40+Math.random()*60;
    s.style.setProperty('--tx',`translateX(${Math.cos(angle)*dist}px) translateY(${Math.sin(angle)*dist}px)`);
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),800);
  }
  setTimeout(()=>el.remove(),1200);
}

// ── NOTIFICATION ──
function showNotif(msg, emoji='🎉', color='var(--green)'){
  const existing=document.querySelector('.notif');
  if(existing) existing.remove();
  const n=document.createElement('div');
  n.className='notif';
  n.innerHTML=`<span style="font-size:22px">${emoji}</span><span>${msg}</span>`;
  n.style.borderColor=color;
  document.body.appendChild(n);
  setTimeout(()=>{ n.classList.add('hide'); setTimeout(()=>n.remove(),300); },3000);
}

// ── PARTICLES ──
function initParticles(){
  const wrap=document.getElementById('particles');
  if(!wrap) return;
  const colors=['#58CC02','#1CB0F6','#FFD900','#CE82FF','#FF9600'];
  for(let i=0;i<18;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=3+Math.random()*6;
    p.style.cssText=`
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay:${Math.random()*12}s;
      animation-duration:${8+Math.random()*12}s;
    `;
    wrap.appendChild(p);
  }
}

// ── DAILY MISSIONS (random pool, reset every 24h) ──
const MISSION_POOL = [
  { id:'steps',    icon:'🚶', color:'#1CB0F6', name:'Camina 1000 pasos',        desc:'Registra tu actividad física hoy',             xp:30, total:1000 },
  { id:'read',     icon:'📖', color:'#FF9600', name:'Lee 15 minutos',            desc:'Lectura de cualquier material',                xp:25, total:15   },
  { id:'water',    icon:'💧', color:'#1CB0F6', name:'Toma 8 vasos de agua',      desc:'Mantente hidratado durante el día',            xp:20, total:8    },
  { id:'breathe',  icon:'🌬️', color:'#CE82FF', name:'Ejercicio de respiración',  desc:'3 series de respiración profunda',             xp:15, total:3    },
  { id:'journal',  icon:'✍️', color:'#FFD900', name:'Escribe en tu diario',       desc:'Escribe cómo te sientes hoy',                  xp:35, total:1    },
  { id:'stretch',  icon:'🧘', color:'#58CC02', name:'Estira 10 minutos',          desc:'Haz una rutina de estiramiento',               xp:20, total:10   },
  { id:'smile',    icon:'😊', color:'#FFD900', name:'Comparte una sonrisa',       desc:'Sé amable con alguien hoy',                    xp:15, total:1    },
  { id:'nature',   icon:'🌿', color:'#58CC02', name:'5 min en la naturaleza',     desc:'Sal afuera aunque sea un momento',             xp:25, total:5    },
  { id:'gratitud', icon:'🙏', color:'#FF9600', name:'3 cosas de gratitud',        desc:'Escribe 3 cosas por las que estás agradecido', xp:30, total:3    },
  { id:'social',   icon:'💬', color:'#CE82FF', name:'Habla con alguien',          desc:'Ten una conversación positiva',                xp:20, total:1    },
  { id:'noscreen', icon:'📵', color:'#FF4B4B', name:'30 min sin pantallas',       desc:'Descansa tus ojos de las pantallas',           xp:40, total:30   },
  { id:'kindness', icon:'❤️', color:'#FF4B4B', name:'Acto de bondad',             desc:'Haz algo bueno por alguien',                   xp:35, total:1    },
];

// Returns today's date string (YYYY-MM-DD) – resets at midnight
function todayKey(){
  const d=new Date();
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

function getDailyMissions(){
  const key='seguirte_missions_'+todayKey();
  // clean up old mission keys
  Object.keys(localStorage).forEach(k=>{
    if(k.startsWith('seguirte_missions_') && k!==key) localStorage.removeItem(k);
  });
  let saved=localStorage.getItem(key);
  if(saved) return JSON.parse(saved);
  // Seed-based shuffle by date so all users get consistent missions that day
  const seed=parseInt(todayKey().replace(/-/g,''));
  function seededRand(s){ let x=Math.sin(s+1)*10000; return x-Math.floor(x); }
  const shuffled=[...MISSION_POOL].sort((a,b)=>seededRand(seed+MISSION_POOL.indexOf(a))-seededRand(seed+MISSION_POOL.indexOf(b))).slice(0,4);
  shuffled.forEach(m=>{ m.progress=0; m.done=false; });
  localStorage.setItem(key,JSON.stringify(shuffled));
  return shuffled;
}

function saveMissions(missions){
  localStorage.setItem('seguirte_missions_'+todayKey(), JSON.stringify(missions));
}

// ── RENDER MISSIONS ──
function renderMissions(containerId){
  const wrap=document.getElementById(containerId);
  if(!wrap) return;
  const missions=getDailyMissions();
  wrap.innerHTML='';
  missions.forEach((m,i)=>{
    const pct=Math.min(100,Math.round((m.progress/m.total)*100));
    const card=document.createElement('div');
    card.className='mission-card'+(m.done?' done':'');
    card.innerHTML=`
      <div class="mission-icon" style="background:${m.color}22; color:${m.color}">${m.icon}</div>
      <div class="mission-info">
        <div class="mission-name">${m.name}</div>
        <div class="mission-desc">${m.desc}</div>
        <div class="mission-prog"><div class="mission-prog-fill" style="width:${pct}%;background:${m.color}"></div></div>
        <div class="mission-xp">⚡ +${m.xp} XP · ${m.progress}/${m.total}</div>
      </div>
    `;
    if(!m.done){
      card.addEventListener('click',()=>{
        playClick();
        m.progress=Math.min(m.total, m.progress+1);
        if(m.progress>=m.total && !m.done){
          m.done=true;
          playSuccess();
          floatXP(m.xp);
          showNotif(`¡Misión completada: ${m.name}!`,'🎯');
          // Actualizar XP en pantalla
          document.querySelectorAll('[data-xp-display]').forEach(el=>{
            el.textContent = (parseInt(el.textContent)||0) + m.xp;
          });
        }
        saveMissions(missions);
        renderMissions(containerId);
        if(typeof updateMissionsCount==='function') updateMissionsCount();
      });
    }
    wrap.appendChild(card);
    card.style.opacity='0'; card.style.transform='translateX(-20px)';
    setTimeout(()=>{
      card.style.transition='opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity='1'; card.style.transform='translateX(0)';
    }, i*80);
  });
}

// ── STREAK: once per 24h ──
// Returns true if streak was updated today already
function hasUpdatedStreakToday(){
  return localStorage.getItem('seguirte_streak_date')===todayKey();
}
function markStreakUpdatedToday(){
  localStorage.setItem('seguirte_streak_date', todayKey());
}

// ── WEEK CALENDAR: check mark per day connected, resets weekly ──
function getWeekData(){
  // Week key: ISO week number
  const now=new Date();
  const startOfYear=new Date(now.getFullYear(),0,1);
  const weekNum=Math.ceil(((now-startOfYear)/86400000+startOfYear.getDay()+1)/7);
  const weekKey='seguirte_week_'+now.getFullYear()+'_w'+weekNum;
  // Clean old week keys
  Object.keys(localStorage).forEach(k=>{
    if(k.startsWith('seguirte_week_') && k!==weekKey) localStorage.removeItem(k);
  });
  let data=localStorage.getItem(weekKey);
  if(data) return {key:weekKey, days:JSON.parse(data)};
  // days: array of 7 booleans [Mon..Sun]
  return {key:weekKey, days:[false,false,false,false,false,false,false]};
}

function markTodayConnected(){
  const {key, days}=getWeekData();
  const now=new Date();
  // getDay(): 0=Sun,1=Mon...6=Sat → map to [Mon..Sun] index
  const idx=(now.getDay()+6)%7;
  days[idx]=true;
  localStorage.setItem(key, JSON.stringify(days));
}

function getWeekDays(){ return getWeekData().days; }

// ── EMOTION: once per 24h ──
function hasRegisteredEmotionToday(){
  return localStorage.getItem('seguirte_emotion_date')===todayKey();
}
function markEmotionRegistered(){
  localStorage.setItem('seguirte_emotion_date', todayKey());
}

// ── XP BAR ANIMATION ──
function animateXPBar(fillId, pct, delay=300){
  setTimeout(()=>{
    const el=document.getElementById(fillId);
    if(el) el.style.width=pct+'%';
  }, delay);
}

// ── BUTTON SOUNDS ──
document.addEventListener('DOMContentLoaded',()=>{
  initParticles();
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('click',()=>playClick());
  });
  document.querySelectorAll('.xp-bar-fill').forEach((bar,i)=>{
    const target=bar.dataset.pct||'0';
    bar.style.width='0%';
    setTimeout(()=>{ bar.style.width=target+'%'; }, 400+i*100);
  });
  // Mark today as connected (for weekly calendar)
  markTodayConnected();
});

// ── HAMBURGER / SIDEBAR ──
function toggleSidebar(){
  const sb = document.querySelector('.sidebar');
  const ov = document.getElementById('sidebarOverlay');
  sb?.classList.toggle('open');
  if(sb?.classList.contains('open')){
    ov?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  } else {
    closeSidebar();
  }
}
function closeSidebar(){
  document.querySelector('.sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('visible');
  document.body.style.overflow = '';
}

// ── EXCEL EXPORT (pure JS, no server needed) ──
// Generates a .xlsx-compatible CSV that Excel opens correctly
function exportToExcel(data, filename){
  // Build CSV with BOM for Excel UTF-8
  const BOM='\uFEFF';
  let csv=BOM;
  if(data.length===0){ showNotif('No hay datos para exportar','⚠️','var(--yellow)'); return; }
  // Headers
  csv+=Object.keys(data[0]).map(k=>'"'+k+'"').join(',')+'\n';
  // Rows
  data.forEach(row=>{
    csv+=Object.values(row).map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')+'\n';
  });
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=filename||'reporte.csv';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotif('Reporte descargado correctamente ✅','📊');
  playSuccess();
}
