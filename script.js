let userRole = null;

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  const reminderForm = document.getElementById("reminder-form");
  if (reminderForm) {
    reminderForm.style.display = userRole === "admin" ? "block" : "none";
  }
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const code = document.getElementById("code").value.trim();

  if (code === "zinc21") {
    userRole = "admin";
    document.getElementById("login-message").textContent = `Selamat datang Admin ${username}!`;
  } else {
    userRole = "member";
    document.getElementById("login-message").textContent = `Halo ${username}, kamu login sebagai member.`;
  }

  showPage("agenda");
}
