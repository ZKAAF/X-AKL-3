const jadwal = [
  { hari: "Senin", mapel: "Akuntansi Dasar", jam: "07.00 - 08.40" },
  { hari: "Selasa", mapel: "Bahasa Indonesia", jam: "08.40 - 10.20" },
  { hari: "Rabu", mapel: "Matematika", jam: "10.30 - 12.00" },
];

const tbody = document.getElementById("jadwal-body");
jadwal.forEach(item => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${item.hari}</td><td>${item.mapel}</td><td>${item.jam}</td>`;
  tbody.appendChild(row);
});