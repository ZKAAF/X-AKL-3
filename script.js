function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Default halaman pertama
document.addEventListener('DOMContentLoaded', () => {
  showPage('profil');
});
