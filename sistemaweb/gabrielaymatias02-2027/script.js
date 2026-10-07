const APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbw-ZpVJUgb1BVstahM3NytqDixyH2_zv39xyJcd71yoolfL6qLLt5Rt5q-3nLDa9Ovh/exec"; // pegá aquí la URL /exec de Google Apps Script
const q=new URLSearchParams(location.search);
const guest=(q.get("invitado")||"Familia e invitados").replaceAll("-"," ");
const seats=q.get("cupos")||"";
coverGuest.textContent=guest; coverSeats.textContent=seats?`${seats} ${seats==="1"?"lugar":"lugares"}`:"";
document.querySelectorAll(".guestHidden").forEach(x=>x.value=guest);

seal.onclick=()=>{envelope.classList.add("open");setTimeout(()=>enterBtn.hidden=false,950)};
enterBtn.onclick=()=>{cover.classList.add("hide");document.body.classList.remove("locked");music.play().then(()=>musicBtn.textContent="Ⅱ").catch(()=>{})};
musicBtn.onclick=()=>{if(music.paused){music.play().catch(()=>{});musicBtn.textContent="Ⅱ"}else{music.pause();musicBtn.textContent="▶"}};

const target=new Date("2027-02-20T20:00:00-03:00").getTime();
function tick(){let t=Math.max(0,target-Date.now()),d=Math.floor(t/864e5);t%=864e5;let h=Math.floor(t/36e5);t%=36e5;let m=Math.floor(t/6e4),s=Math.floor((t%6e4)/1000);days.textContent=String(d).padStart(2,"0");hours.textContent=String(h).padStart(2,"0");minutes.textContent=String(m).padStart(2,"0");seconds.textContent=String(s).padStart(2,"0")}tick();setInterval(tick,1000);

const slides=[...document.querySelectorAll(".slide")];dots.innerHTML=slides.map((_,i)=>`<i class="${i===0?"active":""}"></i>`).join("");
slider.addEventListener("scroll",()=>{const i=Math.round(slider.scrollLeft/(slider.clientWidth*.82+14));[...dots.children].forEach((x,n)=>x.classList.toggle("active",n===i))});

document.querySelectorAll("[data-choice]").forEach(b=>b.onclick=()=>{const yes=b.dataset.choice==="yes";yesPanel.hidden=!yes;noPanel.hidden=yes;(yes?yesPanel:noPanel).scrollIntoView({behavior:"smooth",block:"center"})});
bankBtn.onclick=()=>bank.hidden=!bank.hidden;
document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText(b.dataset.copy);b.textContent="Copiado ✓"});

document.querySelectorAll("form").forEach(f=>f.onsubmit=async e=>{e.preventDefault();const st=f.querySelector(".status"),data=Object.fromEntries(new FormData(f));data.tipo=f.dataset.type;data.fecha=new Date().toISOString();if(!APPS_SCRIPT_URL){st.textContent="Falta conectar Google Sheets.";return}st.textContent="Enviando...";try{await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data)});st.textContent="¡Enviado! Gracias ♥";f.reset()}catch(e){st.textContent="No se pudo enviar. Intentá nuevamente."}});