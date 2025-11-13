const jadwal = {
  SENIN: ["UPACARA", "ETIKA PROFESI", "ETIKA PROFESI", "ETIKA PROFESI", "IPAS", "IPAS", "IPAS", "SENI MUSIK", "SENI MUSIK", "INFORMATIKA", "INFORMATIKA"],
  SELASA: ["SPREADSHEET", "SPREADSHEET", "SPREADSHEET", "SPREADSHEET", "IPAS", "IPAS", "IPAS", "PEND. PANCASILA", "PEND. PANCASILA", "BAHASA INGGRIS", "BAHASA INGGRIS"],
  RABU: ["INFORMATIKA", "INFORMATIKA", "BAHASA KOREA", "BAHASA KOREA", "MATEMATIKA", "MATEMATIKA", "MATEMATIKA", "MATEMATIKA", "PEND. AGAMA ISLAM", "PEND. AGAMA ISLAM", "PEND. AGAMA ISLAM"],
  KAMIS: ["BAHASA INDONESIA", "BAHASA INDONESIA", "BAHASA INDONESIA", "BAHASA INDONESIA", "BAHASA INGGRIS", "BAHASA INGGRIS", "DASAR-DASAR AKL 1", "DASAR-DASAR AKL 1", "DASAR-DASAR AKL 1", "DASAR-DASAR AKL 1", "DASAR-DASAR AKL 1"],
  JUMAT: ["PJOK", "PJOK", "PJOK", "SEJARAH", "SEJARAH"]
};

function tampilkanJadwal(hari) {
  const container = document.getElementById("jadwal-container");
  if (!hari) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `<h2>Jadwal Hari ${hari}</h2><ul>` +
    jadwal[hari].map((mapel, index) => `<li>${index + 1}. ${mapel}</li>`).join("") +
    `</ul>`;
}

const anggotaKelas = Array.from({ length: 35 }, (_, i) => ({
  nama: `Nama ${i + 1}`,
  foto: "https://via.placeholder.com/100x100?text=Foto"
}));

const daftar = document.getElementById("daftar-anggota");
anggotaKelas.forEach(siswa => {
  const div = document.createElement("div");
  div.className = "anggota";
  div.innerHTML = `<img src="${siswa.foto}" alt="Foto ${siswa.nama}"><p>${siswa.nama}</p>`;
  daftar.appendChild(div);
});
