// Data awal anggota 35 dengan foto placeholder
const members = Array.from({length:35}, (_,i)=>({
  id: i+1,
  name: `Nama ${i+1}`,
  photo: `https://i.pravatar.cc/150?img=${(i%70)+1}`
}));

// Jadwal data struktur hari -> list mapel (mapelName)
// Ulangi nama mapel sesuai jumlah jam
const jadwalData = {
  SENIN: [
    'UPACARA',
    'ETIKA PROFESI','ETIKA PROFESI','ETIKA PROFESI',
    'IPAS','IPAS','IPAS',
    'SENI MUSIK','SENI MUSIK',
    'INFORMATIKA','INFORMATIKA'
  ],
  SELASA: [
    'SPREADSHEET','SPREADSHEET','SPREADSHEET','SPREADSHEET',
    'IPAS','IPAS','IPAS',
    'PEND. PANCASILA','PEND. PANCASILA',
    'BAHASA INGGRIS','BAHASA INGGRIS'
  ],
  RABU: [
    'INFORMATIKA','INFORMATIKA',
    'BAHASA KOREA','BAHASA KOREA',
    'MATEMATIKA','MATEMATIKA','MATEMATIKA','MATEMATIKA',
    'PEND. AGAMA ISLAM','PEND. AGAMA ISLAM','PEND. AGAMA ISLAM'
  ],
  KAMIS: [
    'BAHASA INDONESIA','BAHASA INDONESIA','BAHASA INDONESIA','BAHASA INDONESIA',
    'BAHASA INGGRIS','BAHASA INGGRIS',
    'DASAR-DASAR AKL 1','DASAR-DASAR AKL 1','DASAR-DASAR AKL 1','DASAR-DASAR AKL 1','DASAR-DASAR AKL 1'
  ],
  JUMAT: [
    'PJOK','PJOK','PJOK','SEJARAH','SEJARAH'
  ]
};

// Simpan tanda tugas di localStorage dengan key 'classTasks'
// Struktur: { "<hari>|<mapel>": { flagged: true, desc: "..." } }
const TASK_KEY = 'classTasks';
let tasks = JSON.parse(localStorage.getItem(TASK_KEY) || '{}');

// helper untuk hitung berapa jam sebuah mapel muncul pada hari tertentu
function countMapelOccur(list, name){
  return list.filter(x=>x===name).length;
}

/* RENDERING */
// navigasi view
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const view = btn.dataset.view;
    document.querySelectorAll('.view').forEach(v=>{
      v.hidden = v.id !== view;
    });
  });
});

// render anggota grid
const memberGrid = document.getElementById('memberGrid');
const memberList = document.getElementById('memberList');
function renderMembers(){
  memberGrid.innerHTML = '';
  memberList.innerHTML = '';
  members.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img alt="${m.name}" src="${m.photo}"><div class="name">${m.name}</div>`;
    memberGrid.appendChild(card);

    const item = document.createElement('div');
    item.className = 'member-item';
    item.textContent = `${m.id}. ${m.name}`;
    memberList.appendChild(item);
  });
}
renderMembers();

// render jadwal
const dayList = document.getElementById('dayList');
const mapelInfo = document.getElementById('mapelInfo');

function mapelKey(hari, name){ return `${hari}|${name}`; }

function renderJadwal(){
  dayList.innerHTML = '';
  for(const hari of Object.keys(jadwalData)){
    const dayWrap = document.createElement('div');
    dayWrap.className = 'day';
    const h = document.createElement('h4');
    h.textContent = hari;
    dayWrap.appendChild(h);

    // compute unique mapel order preserving first appearance
    const list = jadwalData[hari];
    const seen = new Set();
    const unique = [];
    list.forEach(m=>{
      if(!seen.has(m)){ seen.add(m); unique.push(m); }
    });

    unique.forEach(mapelName=>{
      const count = countMapelOccur(list, mapelName);
      const key = mapelKey(hari, mapelName);
      const hasTask = tasks[key] && tasks[key].flagged;

      const mapelEl = document.createElement('div');
      mapelEl.className = 'mapel';
      mapelEl.dataset.hari = hari;
      mapelEl.dataset.mapel = mapelName;

      mapelEl.innerHTML = `
        <div class="left">
          <div>
            <div class="title">${mapelName}</div>
            <div class="count">${count}-jam</div>
          </div>
        </div>
        <div class="right">
          <div class="flag ${hasTask? 'task':'none'}" title="${hasTask? 'Terdapat tugas':'Tidak ada tugas'}">
            ${hasTask? '!' : '-'}
          </div>
        </div>
      `;

      // klik untuk menampilkan info dan (jika admin) edit
      mapelEl.addEventListener('click', ()=>onMapelClick(hari, mapelName));
      dayWrap.appendChild(mapelEl);
    });

    dayList.appendChild(dayWrap);
  }
}
renderJadwal();

// Mapel click handler
function onMapelClick(hari, mapelName){
  const key = mapelKey(hari, mapelName);
  const info = tasks[key] || { flagged:false, desc:'' };
  mapelInfo.innerHTML = `
    <strong>${mapelName}</strong><br>
    <span class="small">${countMapelOccur(jadwalData[hari], mapelName)}-jam pada hari ${hari}</span>
    <hr>
    <div><strong>Tanda tugas</strong>: ${info.flagged? '<span style="color:var(--danger)">YA</span>':'TIDAK'}</div>
    <div style="margin-top:8px"><strong>Deskripsi</strong>: ${info.desc || '<span class="small">Tidak ada</span>'}</div>
  `;

  // jika role admin, buka modal edit
  const role = document.getElementById('roleSelect').value;
  if(role === 'admin'){
    openTaskModal(hari, mapelName);
  }
}

/* MODAL EDIT TASK (ADMIN) */
const taskModal = document.getElementById('taskModal');
const modalMapelName = document.getElementById('modalMapelName');
const taskFlag = document.getElementById('taskFlag');
const taskDesc = document.getElementById('taskDesc');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const closeTaskBtn = document.getElementById('closeTaskBtn');

let editingKey = null;
function openTaskModal(hari, mapelName){
  editingKey = mapelKey(hari,mapelName);
  modalMapelName.textContent = `${hari} — ${mapelName}`;
  const info = tasks[editingKey] || { flagged:false, desc:'' };
  taskFlag.checked = !!info.flagged;
  taskDesc.value = info.desc || '';
  taskModal.hidden = false;
}

closeTaskBtn.addEventListener('click', ()=>{ taskModal.hidden = true; editingKey = null; });
saveTaskBtn.addEventListener('click', ()=>{
  if(!editingKey) return;
  const flagged = !!taskFlag.checked;
  const desc = taskDesc.value.trim();
  if(!flagged && !desc){
    delete tasks[editingKey];
  } else {
    tasks[editingKey] = { flagged, desc, updatedBy: document.getElementById('adminName').value || 'admin' , updatedAt: new Date().toISOString() };
  }
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  taskModal.hidden = true;
  editingKey = null;
  renderJadwal();
});

// inisialisasi role/admin name display
document.getElementById('roleSelect').addEventListener('change', ()=>{
  // nothing else needed; modal only available when role admin
});

// initial render of members/jadwal done already

// small UX: tekan Escape untuk tutup modal
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && !taskModal.hidden){ taskModal.hidden = true; }
});
