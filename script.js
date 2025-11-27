// ===== CONFIG =====
const ADMIN_PASS = "6761";
const guruNama = "Farita Nurmala S.Pd.";
const siswaData = [
  {nama:"Ahmad Fauzan R.", pass:"af001", user:"ahmad"},
  {nama:"Anisa Aulia P.", pass:"aa002", user:"anisa"},
  {nama:"Ariza Syifa A.", pass:"as003", user:"ariza"},
  {nama:"Arjanti Nathania A.S.", pass:"an004", user:"arjanti"},
  {nama:"Aurelia Batrisya U.S.", pass:"ab005", user:"aurelia"},
  {nama:"Azka Bachtiar F.", pass:"6761", user:"azka"},
  {nama:"Davina Nasyifa", pass:"dn007", user:"davina"},
  {nama:"Dinda Sahfira P.", pass:"ds008", user:"dinda"},
  {nama:"Elica Senta A.", pass:"es009", user:"elica"},
  {nama:"Fatih Algis S.", pass:"fa010", user:"fatih"},
  {nama:"Hafiza Azha S.", pass:"ha011", user:"hafiza"},
  {nama:"Herliana", pass:"he012", user:"herliana"},
  {nama:"Ivanesya Aztana", pass:"ia013", user:"ivanesya"},
  {nama:"Jelita Sulistya N.", pass:"js014", user:"jelita"},
  {nama:"Kartika Syalom E.H.", pass:"ks015", user:"kartika"},
  {nama:"Levy Widya S.", pass:"lw016", user:"levy"},
  {nama:"Mahardika Febriansyah", pass:"mf017", user:"mahardika"},
  {nama:"Melda", pass:"me018", user:"melda"},
  {nama:"Millah Oktapiyah", pass:"mo019", user:"millah"},
  {nama:"M. Gilang A.", pass:"mg020", user:"gilang"},
  {nama:"Nazzellah Nur R.", pass:"nn021", user:"nazzellah"},
  {nama:"Novia Ardani", pass:"na022", user:"novia"},
  {nama:"Putri Inaya A.", pass:"pi023", user:"putri"},
  {nama:"Risma Musliyah", pass:"rm024", user:"risma"},
  {nama:"Safa Salsabila", pass:"ss025", user:"safa"},
  {nama:"Santri Yuliani", pass:"sy026", user:"santri"},
  {nama:"Shafa Nur F.", pass:"sn027", user:"shafa"},
  {nama:"Shafira Rahmadani", pass:"sr028", user:"shafira"},
  {nama:"Silva Rahma A.", pass:"sa029", user:"silva"},
  {nama:"Suci Rahmadiani A.", pass:"sr030", user:"suci"},
  {nama:"Tiara Wijaya", pass:"tw031", user:"tiara"},
  {nama:"Trissa Oktaviani", pass:"to032", user:"trissa"},
  {nama:"Vania Wulan O.", pass:"vw033", user:"vania"},
  {nama:"Zaki Abdussadad", pass:"za034", user:"zaki"},
  {nama:"Zivilia Nuurfatma", pass:"zn035", user:"zivilia"}
];

let currentUser = null;
let reminders = JSON.parse(localStorage.getItem("akl3_reminders")) || [];
let bgm = null;
let snowInterval = null;

// ===== LOGIN =====
function login(){
  const user = document.getElementById('username').value.trim().toLowerCase();
  const pass = document.getElementById('password').value.trim();
  if(pass === ADMIN_PASS){ currentUser = {level:"admin", user:user, nama:"Admin"}; enterMain(); return; }
  const idx = siswaData.findIndex(s=>s.pass === pass && s.user === user);
  if(idx !== -1){ currentUser = {level:"member", user:user, nama:siswaData[idx].nama}; enterMain(); return; }
  document.getElementById('loginError').textContent = "Username / password salah!";
}
function loginGuest(){ currentUser = {level:"guest", user:"guest", nama:"Guest"}; enterMain(); }
function enterMain(){
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
  document.getElementById('userInfo').textContent = `Hi, ${currentUser.user}, my (${currentUser.level})`;
  if(currentUser.level !== "guest") showReminderBox();
  initBGM(); startCountdown(); showPage('profil');
}
function logout(){ currentUser = null; location.reload(); }

// ===== PAGE =====
const pages = {
  profil:`
    <h2>Profil Kelas X AKL 3</h2>
    <h3>Guru</h3><p>"${guruNama}"</p>
    <h3>Siswa</h3><div class="profil-grid">${generateSiswa()}</div>`,
  agenda:`
    <h2>Agenda / Jadwal Pelajaran</h2>
    <div class="jadwal">
      <h3>Senin</h3><ul><li>UPACARA</li><li>ETIKA PROFESI (3 jam)</li><li>ISTIRAHAT</li><li>IPAS (3 jam)</li><li>ISHOMA</li><li>SENI MUSIK (2 jam)</li><li>INFORMATIKA (2 jam)</li></ul>
      <h3>Selasa</h3><ul><li>SPREADSHEET (4 jam)</li><li>ISTIRAHAT</li><li>IPAS (3 jam)</li><li>ISHOMA</li><li>PEND. PANCASILA (2 jam)</li><li>BAHASA INGGRIS (2 jam)</li></ul>
      <h3>Rabu</h3><ul><li>INFORMATIKA (2 jam)</li><li>BAHASA KOREA (2 jam)</li><li>ISTIRAHAT</li><li>MATEMATIKA (3 jam)</li><li>ISHOMA</li><li>MATEMATIKA</li><li>PEND. AGAMA ISLAM (3 jam)</li></ul>
      <h3>Kamis</h3><ul><li>BAHASA INDONESIA (4 jam)</li><li>ISTIRAHAT</li><li>BAHASA INGGRIS (2 jam)</li><li>DASAR-DASAR AKL 1 (1 jam)</li><li>ISHOMA</li><li>DASAR-DASAR AKL 1 (3 jam)</li></ul>
      <h3>Jum'at</h3><ul><li>PJOK (3 jam)</li><li>ISTIRAHAT</li><li>SEJARAH (2 jam)</li></ul>
    </div>`,
  feedback:`<h2>Feedback</h2><p>Silakan isi formulir feedback kami:</p><a href="https://forms.gle/XXXX" target="_blank">Klik di sini untuk Google Form</a>`,
  contact:`<h2>Contact Us!</h2><p>Ikuti kami di Instagram:</p><a href="https://instagram.com/xakl3" target="_blank">@xakl3</a>`,
  game:`
    <h2>Mini-Game Klik Cepat</h2>
    <p>Klik tombol sebanyak-banyaknya dalam 10 detik!</p>
    <button id="gameBtn" onclick="clickBtn()">Klik Aku!</button>
    <div>Skor: <b id="score">0</b></div>
    <div id="leaderboard"></div>`
};
function generateSiswa(){
  return siswaData.map((s,i)=>`
    <div class="profil-card" onclick="openFoto(${i})">
      <img src="assets/siswa${i+1}.jpg" onerror="this.src='assets/default.jpg'"/>
      <p>${s.nama}</p>
    </div>`).join('');
}
function openFoto(i){
  document.getElementById('fotoFull').src = `assets/siswa${i+1}.jpg`;
  document.getElementById('fotoModal').style.display = 'flex';
}
function showPage(page){
  const content = document.getElementById('content');
  content.innerHTML = pages[page];
  if(page==='agenda') renderReminder();
  if(page==='game') loadLeaderboard();
}

// ===== REMINDER =====
function showReminderBox(){
  const box = document.getElementById('reminderBox');
  box.style.display = 'block';
  renderReminder();
}
function toggleReminder(){
  const body = document.getElementById('reminderBody');
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
}
function tambahReminderVisual(){
  const mapel = prompt("Mapel:");
  if(!mapel) return;
  const tugas = prompt("Deskripsi tugas:");
  if(!tugas) return;
  reminders.push({mapel, tugas, done:false, date:new Date().toLocaleString('id-ID')});
  saveReminder(); toast("Reminder ditambahkan!"); renderReminder();
}
function renderReminder(){
  const active = reminders.filter(r=>!r.done);
  const done = reminders.filter(r=>r.done);
  let html = '';
  if(currentUser.level==='admin') html = '<button id="addBtn" onclick="tambahReminderVisual()">+ Tambah</button>';
  html += active.map(r=>`
    <div class="reminder-item">
      <input type="checkbox" onchange="toggleDone(${reminders.indexOf(r)})">
      <label><strong>${r.mapel}</strong>: ${r.tugas} <small>(${r.date})</small></label>
    </div>`).join('');
  document.getElementById('reminderList').innerHTML = html;
  document.getElementById('completedList').innerHTML = '<small>Completed</small>' + done.map(r=>`
    <div class="reminder-item completed">
      <input type="checkbox" checked onchange="toggleDone(${reminders.indexOf(r)})">
      <label><strong>${r.mapel}</strong>: ${r.tugas} <small>(${r.date})</small></label>
    </div>`).join('');
}
function toggleDone(idx){
  reminders[idx].done = !reminders[idx].done;
  saveReminder(); toast("Reminder diperbarui!"); renderReminder();
}
function saveReminder(){ localStorage.setItem("akl3_reminders", JSON.stringify(reminders)); }

// ===== THEME =====
function toggleTheme(){
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', html.dataset.theme);
}
(function(){
  const saved = localStorage.getItem('theme');
  if(saved) document.documentElement.dataset.theme = saved;
})();

// ===== BGM =====
let bgm = null;
function initBGM(){
  bgm = new Audio('https://cdn.pixabay.com/download/audio/2022/02/21/audio_081a2a5a44.mp3');
  bgm.loop = true; bgm.volume = document.getElementById('volSlider').value;
}
function toggleBGM(){ if(!bgm) return; bgm.paused ? bgm.play() : bgm.pause(); toast(bgm.paused ? "BGM dijeda" : "BGM diputar"); }
function setVol(v){ if(bgm) bgm.volume = v; }

// ===== SALJU =====
function toggleSnow(){
  if(!snowInterval){ startSnow(); toast("Salju aktif"); } else { stopSnow(); toast("Salju nonaktif"); }
}
function startSnow(){
  const canvas = document.getElementById('snowCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const flakes = Array.from({length:150}, ()=>({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*3+1, d:Math.random()*2+1}));
  snowInterval = setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255,255,255,.8)";
    flakes.forEach(f=>{ ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill(); f.y+=f.d; if(f.y>canvas.height) f.y=-10; });
  }, 30);
}
function stopSnow(){ clearInterval(snowInterval); snowInterval = null; document.getElementById('snowCanvas').getContext('2d').clearRect(0,0,window.innerWidth,window.innerHeight); }

// ===== COUNTDOWN =====
function startCountdown(){
  const target = new Date("Dec 31, 2025 00:00:00").getTime();
  setInterval(()=>{
    const t = target - new Date().getTime();
    const d = Math.floor(t/(1000*60*60*24));
    const h = Math.floor((t%(1000*60*60*24))/(1000*60*60));
    const m = Math.floor((t%(1000*60*60))/(1000*60));
    const s = Math.floor((t%(1000*60))/1000);
    document.getElementById('countdown').textContent = `Countdown: ${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}

// ===== MINI-GAME =====
let gameScore = 0, gameTime = 10, gameInterval;
function startGame(){
  gameScore = 0; gameTime = 10;
  document.getElementById('score').textContent = gameScore;
  const btn = document.getElementById('gameBtn');
  btn.disabled = false; btn.textContent = "Klik Aku!";
  btn.onclick = clickBtn;
  gameInterval = setInterval(()=>{
    gameTime--;
    if(gameTime <= 0){ clearInterval(gameInterval); btn.disabled = true; btn.textContent = "Waktu habis!"; saveScore(gameScore); toast(`Skor kamu: ${gameScore}`); loadLeaderboard(); }
  }, 1000);
}
function clickBtn(){ gameScore++; document.getElementById('score').textContent = gameScore; }
function saveScore(score){
  let board = JSON.parse(localStorage.getItem("akl3_leaderboard")) || [];
  board.push({nama: currentUser.nama, score: score, date: new Date().toLocaleString('id-ID')});
  board.sort((a,b)=>b.score-a.score); board = board.slice(0,5);
  localStorage.setItem("akl3_leaderboard", JSON.stringify(board));
}
function loadLeaderboard(){
  const board = JSON.parse(localStorage.getItem("akl3_leaderboard")) || [];
  document.getElementById('leaderboard').innerHTML = board.map((b,i)=>`<div>${i+1}. ${b.nama} - ${b.score} pts</div>`).join('');
}
function resetScore(){ localStorage.removeItem("akl3_leaderboard"); toast("Leaderboard direset!"); loadLeaderboard(); }

// ===== TOAST =====
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.display = 'block';
  setTimeout(()=>t.style.display='none', 2000);
}

// ===== INIT =====
showPage('profil');
