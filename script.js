// ===== CONFIG =====
const ADMIN_PASS = "6761";
const guruNama = "Farita Nurmala S.Pd.";

// ===== DATA SISWA =====
const siswaData = [
  {nama:"Ahmad Fauzan R.", pass:"af001", user:"ahmad"},
  {nama:"Anisa Aulia P.", pass:"aa002", user:"anisa"},
  {nama:"Ariza Syifa A.", pass:"as003", user:"ariza"},
  {nama:"Arjanti Nathania A.S.", pass:"an004", user:"arjanti"},
  {nama:"Aurelia Batrisya U.S.", pass:"ab005", user:"aurelia"},
  {nama:"Azka Bachtiar F.", pass:"6761", user:"azka"}, // juga admin
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

let currentUser = null; // {level:"admin"|"member"|"guest", user:"...", nama:"..."}
let reminders = JSON.parse(localStorage.getItem("akl3_reminders")) || [];

const pages = {
  profil:`
    <h2>Profil Kelas X AKL 3</h2>
    <h3>Guru</h3><p>"${guruNama}"</p>
    <h3>Siswa</h3><div class="profil-grid">${generateSiswa()}</div>`,
  agenda:`
    <h2>Agenda / Jadwal Pelajaran</h2>
    <div class="jadwal">
      <h3>Senin</h3><ul><li>UPACERA</li><li>ETIKA PROFESI (3 jam)</li><li>ISTIRAHAT</li><li>IPAS (3 jam)</li><li>ISHOMA</li><li>SENI MUSIK (2 jam)</li><li>INFORMATIKA (2 jam)</li></ul>
      <h3>Selasa</h3><ul><li>SPREADSHEET (4 jam)</li><li>ISTIRAHAT</li><li>IPAS (3 jam)</li><li>ISHOMA</li><li>PEND. PANCASILA (2 jam)</li><li>BAHASA INGGRIS (2 jam)</li></ul>
      <h3>Rabu</h3><ul><li>INFORMATIKA (2 jam)</li><li>BAHASA KOREA (2 jam)</li><li>ISTIRAHAT</li><li>MATEMATIKA (3 jam)</li><li>ISHOMA</li><li>MATEMATIKA</li><li>PEND. AGAMA ISLAM (3 jam)</li></ul>
      <h3>Kamis</h3><ul><li>BAHASA INDONESIA (4 jam)</li><li>ISTIRAHAT</li><li>BAHASA INGGRIS (2 jam)</li><li>DASAR-DASAR AKL 1 (1 jam)</li><li>ISHOMA</li><li>DASAR-DASAR AKL 1 (3 jam)</li></ul>
      <h3>Jum'at</h3><ul><li>PJOK (3 jam)</li><li>ISTIRAHAT</li><li>SEJARAH (2 jam)</li></ul>
    </div>
    <h3>Galeri Kegiatan</h3>
    <div class="galeri">
      <img src="assets/kegiatan1.jpg" alt="K1"/>
      <img src="assets/kegiatan2.jpg" alt="K2"/>
      <img src="assets/kegiatan3.jpg" alt="K3"/>
    </div>`,
  feedback:`<h2>Feedback</h2><p>Silakan isi formulir feedback kami:</p><a href="https://forms.gle/XXXX" target="_blank">Klik di sini untuk Google Form</a>`,
  contact:`<h2>Contact Us!</h2><p>Ikuti kami di Instagram:</p><a href="https://instagram.com/xakl3" target="_blank">@xakl3</a>`
};

function generateSiswa(){
  return siswaData.map((s,i)=>`
    <div class="profil-card">
      <img src="assets/siswa${i+1}.jpg" onerror="this.src='assets/default.jpg'"/>
      <p>${s.nama}</p>
    </div>`).join('');
}

function login(){
  const user = document.getElementById('username').value.trim().toLowerCase();
  const pass = document.getElementById('password').value.trim();
  // cek admin dulu
  if(pass === ADMIN_PASS){
    currentUser = {level:"admin", user:user, nama:"Admin"};
    enterMain(); return;
  }
  // cek member
  const idx = siswaData.findIndex(s=>s.pass === pass && s.user === user);
  if(idx !== -1){
    currentUser = {level:"member", user:user, nama:siswaData[idx].nama};
    enterMain(); return;
  }
  document.getElementById('loginError').textContent = "Username / password salah!";
}

function loginGuest(){
  currentUser = {level:"guest", user:"guest", nama:"Guest"};
  enterMain();
}

function enterMain(){
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
  document.getElementById('userInfo').textContent = `Hi, ${currentUser.user}, my (${currentUser.level})`;
  if(currentUser.level !== "guest") showReminderBox();
  showPage('profil');
}

function logout(){
  currentUser = null;
  location.reload();
}

function showPage(page){
  const content = document.getElementById('content');
  content.innerHTML = pages[page];
}

// ===== REMINDER SYSTEM =====
function showReminderBox(){
  const box = document.getElementById('reminderBox');
  box.style.display = 'block';
  renderReminder();
}

function toggleReminder(){
  const body = document.getElementById('reminderBody');
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

// TOMBOL VISUAL TAMBAH REMINDER
function tambahReminderVisual(){
  const mapel = prompt("Nama Mapel:");
  if(!mapel) return;
  const tugas = prompt("Deskripsi tugas:");
  if(!tugas) return;
  reminders.push({mapel, tugas, done:false, date:new Date().toLocaleString('id-ID')});
  saveReminder();
  renderReminder();
}

function renderReminder(){
  const listDiv = document.getElementById('reminderList');
  const doneDiv = document.getElementById('completedList');
  const active = reminders.filter(r=>!r.done);
  const done = reminders.filter(r=>r.done);

  // bagian active + tombol tambah (hanya admin)
  let htmlActive = '';
  if(currentUser.level === 'admin'){
    htmlActive = `<button onclick="tambahReminderVisual()" style="width:100%;margin-bottom:8px;">+ Tambah Reminder</button>`;
  }
  htmlActive += active.map((r,i)=>`
    <div class="reminder-item">
      <input type="checkbox" onchange="toggleDone(${reminders.indexOf(r)})">
      <label><strong>${r.mapel}</strong>: ${r.tugas} <small>(${r.date})</small></label>
    </div>`).join('');
  listDiv.innerHTML = htmlActive;

  // bagian completed
  doneDiv.innerHTML = '<small>Completed</small>' + done.map((r,i)=>`
    <div class="reminder-item completed">
      <input type="checkbox" checked onchange="toggleDone(${reminders.indexOf(r)})">
      <label><strong>${r.mapel}</strong>: ${r.tugas} <small>(${r.date})</small></label>
    </div>`).join('');
}

function toggleDone(idx){
  reminders[idx].done = !reminders[idx].done;
  saveReminder();
  renderReminder();
}

function saveReminder(){
  localStorage.setItem("akl3_reminders", JSON.stringify(reminders));
}

// init
showPage('profil');
