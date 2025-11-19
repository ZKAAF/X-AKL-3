const ADMIN_PASS = "6761";
// ===== NAMA + PASSWORD PER-SISWA =====
const siswaData = [
  {nama:"Ahmad Fauzan R.", pass:"af001"},
  {nama:"Anisa Aulia P.", pass:"aa002"},
  {nama:"Ariza Syifa A.", pass:"as003"},
  {nama:"Arjanti Nathania A.S.", pass:"an004"},
  {nama:"Aurelia Batrisya U.S.", pass:"ab005"},
  {nama:"Azka Bachtiar F.", pass:"Azka Hensem"}, // juga jadi admin
  {nama:"Davina Nasyifa", pass:"dn007"},
  {nama:"Dinda Sahfira P.", pass:"ds008"},
  {nama:"Elica Senta A.", pass:"es009"},
  {nama:"Fatih Algis S.", pass:"fa010"},
  {nama:"Hafiza Azha S.", pass:"ha011"},
  {nama:"Herliana", pass:"he012"},
  {nama:"Ivanesya Aztana", pass:"ia013"},
  {nama:"Jelita Sulistya N.", pass:"js014"},
  {nama:"Kartika Syalom E.H.", pass:"ks015"},
  {nama:"Levy Widya S.", pass:"lw016"},
  {nama:"Mahardika Febriansyah", pass:"mf017"},
  {nama:"Melda", pass:"me018"},
  {nama:"Millah Oktapiyah", pass:"mo019"},
  {nama:"M. Gilang A.", pass:"mg020"},
  {nama:"Nazzellah Nur R.", pass:"nn021"},
  {nama:"Novia Ardani", pass:"na022"},
  {nama:"Putri Inaya A.", pass:"pi023"},
  {nama:"Risma Musliyah", pass:"rm024"},
  {nama:"Safa Salsabila", pass:"ss025"},
  {nama:"Santri Yuliani", pass:"sy026"},
  {nama:"Shafa Nur F.", pass:"sn027"},
  {nama:"Shafira Rahmadani", pass:"sr028"},
  {nama:"Silva Rahma A.", pass:"sa029"},
  {nama:"Suci Rahmadiani A.", pass:"sr030"},
  {nama:"Tiara Wijaya", pass:"tw031"},
  {nama:"Trissa Oktaviani", pass:"to032"},
  {nama:"Vania Wulan O.", pass:"vw033"},
  {nama:"Zaki Abdussadad", pass:"za034"},
  {nama:"Zivilia Nuurfatma", pass:"zn035"}
];

let currentUser = null; // {level:"admin"|"member"|"guest", index:-1}
let reminders = JSON.parse(localStorage.getItem("akl3_reminders")) || [];

const pages = {
  profil:`
    <h2>Profil Kelas X AKL 3</h2>
    <h3>Guru</h3><p>"Farita Nurmala S.Pd."</p>
    <h3>Siswa</h3><div class="profil-grid">${generateSiswa()}</div>`,
  agenda:`
    <h2>Agenda / Jadwal Pelajaran</h2>
    <div class="jadwal">
      <h3>Senin</h3><ul><li>UPACARA</li><li>ETIKA PROFESI (3 jam)</li><li>ISTIRAHAT</li><li>IPAS (3 jam)</li><li>ISHOMA</li><li>SENI MUSIK (2 jam)</li><li>INFORMATIKA (2 jam)</li></ul>
      <h3>Selasa</h3><ul><li>SPREADSHEET (4 jam)</li><li>ISTIRAHAT</li><li>IPAS (3 jam)</li><li>ISHOMA</li><li>PEND. PANCASILA (2 jam)</li><li>BAHASA INGGRIS (2 jam)</li></ul>
      <h3>Rabu</h3><ul><li>INFORMATIKA (2 jam)</li><li>BAHASA KOREA (2 jam)</li><li>ISTIRAHAT</li><li>MATEMATIKA (3 jam)</li><li>ISHOMA</li><li>MATEMATIKA</li><li>PEND. AGAMA ISLAM (3 jam)</li></ul>
      <h3>Kamis</h3><ul><li>BAHASA INDONESIA (4 jam)</li><li>ISTIRAHAT</li><li>BAHASA INGGRIS (2 jam)</li><li>DASAR-DASAR AKL 1 (1 jam)</li><li>ISHOMA</li><li>DASAR-DASAR AKL 1 (3 jam)</li></ul>
      <h3>Jum'at</h3><ul><li>PJOK (3 jam)</li><li>ISTIRAHAT</li><li>SEJARAH (2 jam)</li></ul>
    </div>
    ${currentUser && currentUser.level !== "guest" ? `
    <div class="reminder">
      <h3>Reminder Tugas</h3>
      <div id="reminderList"></div>
    </div>` : ''}
    <h3>Galeri Kegiatan</h3>
    <div class="galeri">
      <img src="assets/kegiatan1.jpg" alt="K1"/>
      <img src="assets/kegiatan2.jpg" alt="K2"/>
      <img src="assets/kegiatan3.jpg" alt="K3"/>
    </div>`,
  feedback:`
    <h2>Feedback</h2>
    <p>Silakan isi formulir feedback kami:</p>
    <a href="https://forms.gle/XXXX" target="_blank">Klik di sini untuk Google Form</a>`,
  contact:`
    <h2>Contact Us!</h2>
    <p>Ikuti kami di Instagram:</p>
    <a href="https://instagram.com/xakl3" target="_blank">@xakl3</a>`
};

function generateSiswa(){
  return siswaData.map((s,i)=>`
    <div class="profil-card">
      <img src="assets/siswa${i+1}.jpg" onerror="this.src='assets/default.jpg'"/>
      <p>${s.nama}</p>
    </div>`).join('');
}

function login(){
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  // cek admin dulu
  if(pass === "Azka Hensem"){ 
    currentUser = {level:"admin", index:-1}; 
    enterMain(); 
    return;
  }
  // cek member
  const idx = siswaData.findIndex(s=>s.pass === pass);
  if(idx !== -1){ 
    currentUser = {level:"member", index:idx}; 
    enterMain(); 
    return;
  }
  document.getElementById('loginError').textContent = "Password salah!";
}

function loginGuest(){
  currentUser = {level:"guest", index:-1};
  enterMain();
}

function enterMain(){
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
  showPage('profil');
}

function logout(){
  currentUser = null;
  localStorage.removeItem("akl3_reminders");
  location.reload();
}

function renderReminder(){
  const div = document.getElementById('reminderList');
  if(!div) return;
  div.innerHTML = reminders.map((r,i)=>`
    <div class="reminder-item">
      <input type="checkbox" id="chk${i}" ${r.done?'checked':''} onchange="toggleDone(${i})">
      <label for="chk${i}"><strong>${r.mapel}</strong>: ${r.tugas} ${r.done?'<span style="color:green;">✅ Selesai</span>':''}</label>
      ${currentUser.level==="admin"?`<button onclick="delReminder(${i})">Hapus</button>`:''}
    </div>`).join('') + 
  (currentUser.level==="admin"?`
    <form id="reminderForm" onsubmit="addReminder(event)">
      <select id="mapel">${mapelOpts()}</select>
      <textarea id="tugas" placeholder="Deskripsi tugas" required></textarea>
      <button type="submit">Tambah Reminder</button>
    </form>`:'');
}

function mapelOpts(){
  return ["ETIKA PROFESI","IPAS","INFORMATIKA","SPREADSHEET","PEND. PANCASILA","BAHASA INGGRIS","BAHASA KOREA","MATEMATIKA","PEND. AGAMA ISLAM","BAHASA INDONESIA","DASAR-DASAR AKL 1","PJOK","SEJARAH"]
  .map(m=>`<option>${m}</option>`).join('');
}

function addReminder(e){
  e.preventDefault();
  reminders.push({
    mapel:document.getElementById('mapel').value,
    tugas:document.getElementById('tugas').value,
    done:false
  });
  saveReminder();
  renderReminder();
  e.target.reset();
}

function toggleDone(i){
  reminders[i].done = !reminders[i].done;
  saveReminder();
  renderReminder();
}

function delReminder(i){
  reminders.splice(i,1);
  saveReminder();
  renderReminder();
}

function saveReminder(){
  localStorage.setItem("akl3_reminders", JSON.stringify(reminders));
}

function showPage(page){
  const content = document.getElementById('content');
  content.innerHTML = pages[page];
  // re-render reminder jika di agenda
  if(page==='agenda') renderReminder();
}

// init
showPage('profil');
