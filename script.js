const pages = {
  profil: `
    <h2>Profil Kelas X AKL 3</h2>
    <h3>Guru</h3>
    <p>"ISI-TEXT"</p>
    <h3>Siswa</h3>
    <div class="profil-grid">
      ${generateSiswa(35)}
    </div>
  `,
  agenda: `
    <h2>Agenda / Jadwal Pelajaran</h2>
    <div class="jadwal">
      <h3>Senin</h3>
      <ul>
        <li>UPACARA</li>
        <li>ETIKA PROFESI (3 jam)</li>
        <li>ISTIRAHAT</li>
        <li>IPAS (3 jam)</li>
        <li>ISHOMA</li>
        <li>SENI MUSIK (2 jam)</li>
        <li>INFORMATIKA (2 jam)</li>
      </ul>

      <h3>Selasa</h3>
      <ul>
        <li>SPREADSHEET (4 jam)</li>
        <li>ISTIRAHAT</li>
        <li>IPAS (3 jam)</li>
        <li>ISHOMA</li>
        <li>PEND. PANCASILA (2 jam)</li>
        <li>BAHASA INGGRIS (2 jam)</li>
      </ul>

      <h3>Rabu</h3>
      <ul>
        <li>INFORMATIKA (2 jam)</li>
        <li>BAHASA KOREA (2 jam)</li>
        <li>ISTIRAHAT</li>
        <li>MATEmatika (3 jam)</li>
        <li>ISHOMA</li>
        <li>MATEmatika</li>
        <li>PEND. AGAMA ISLAM (3 jam)</li>
      </ul>

      <h3>Kamis</h3>
      <ul>
        <li>BAHASA INDONESIA (4 jam)</li>
        <li>ISTIRAHAT</li>
        <li>BAHASA INGGRIS (2 jam)</li>
        <li>DASAR-DASAR AKL 1 (1 jam)</li>
        <li>ISHOMA</li>
        <li>DASAR-DASAR AKL 1 (3 jam)</li>
      </ul>

      <h3>Jum'at</h3>
      <ul>
        <li>PJOK (3 jam)</li>
        <li>ISTIRAHAT</li>
        <li>SEJARAH (2 jam)</li>
      </ul>
    </div>

    <div class="reminder">
      <h3>Reminder (Admin Only)</h3>
      <form id="reminderForm">
        <label>Mapel:
          <select>
            <option>ETIKA PROFESI</option>
            <option>IPAS</option>
            <option>INFORMATIKA</option>
            <option>SPREADSHEET</option>
            <option>PEND. PANCASILA</option>
            <option>BAHASA INGGRIS</option>
            <option>BAHASA KOREA</option>
            <option>MATEmatika</option>
            <option>PEND. AGAMA ISLAM</option>
            <option>BAHASA INDONESIA</option>
            <option>DASAR-DASAR AKL 1</option>
            <option>PJOK</option>
            <option>SEJARAH</option>
          </select>
        </label>
        <label>Deskripsi:
          <textarea placeholder="Tugas apa?"></textarea>
        </label>
        <button type="submit">Tambah Reminder</button>
      </form>
    </div>

    <h3>Galeri Kegiatan</h3>
    <div class="galeri">
      <img src="assets/kegiatan1.jpg" alt="Kegiatan 1" />
      <img src="assets/kegiatan2.jpg" alt="Kegiatan 2" />
      <img src="assets/kegiatan3.jpg" alt="Kegiatan 3" />
    </div>
  `,
  feedback: `
    <h2>Feedback</h2>
    <p>Silakan isi formulir feedback kami:</p>
    <a href="https://forms.gle/XXXX" target="_blank">Klik di sini untuk Google Form</a>
  `,
  contact: `
    <h2>Contact Us!</h2>
    <p>Ikuti kami di Instagram:</p>
    <a href="https://instagram.com/xakl3" target="_blank">@xakl3</a>
  `
};

function generateSiswa(jumlah) {
  let html = '';
  for (let i = 1; i <= jumlah; i++) {
    html += `
      <div class="profil-card">
        <img src="assets/siswa${i}.jpg" alt="Siswa ${i}" onerror="this.src='assets/default.jpg'"/>
        <p>"ISI-TEXT"</p>
      </div>
    `;
  }
  return html;
}

function showPage(page) {
  const content = document.getElementById('content');
  content.innerHTML = pages[page];
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  content.firstElementChild?.classList.add('active');
}

// Load halaman default
showPage('profil');
