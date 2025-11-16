document.addEventListener("DOMContentLoaded", () => {

  /* =============================
      1) Generate Users Table
  ============================== */
  const tbody = document.getElementById("userTableBody");

  if (tbody) {
    const users = [
      { username: "Khalid Mohammed", role: "Manager", date: "2025-02-22" },
    ];

    for (let i = 0; i < 6; i++) {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${users[0].username}</td>
          <td>${users[0].role}</td>
          <td>${users[0].date}</td>
          <td>
            <i class="fa-solid fa-trash text-danger me-2"></i>
            <i class="fas fa-edit"></i
                    >
          </td>
        </tr>
      `;
    }
  }

  /* =============================
      2) Toggle Show / Hide Password
  ============================== */
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  if (passwordInput && togglePassword) {
    togglePassword.addEventListener("click", () => {
      const show = passwordInput.type === "password";
      passwordInput.type = show ? "text" : "password";
      togglePassword.innerHTML = show
        ? '<i class="bi bi-eye-slash"></i>'
        : '<i class="bi bi-eye"></i>';
    });
  }

  /* =============================
      3) Login Form Validation
  ============================== */
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");

  if (loginForm && emailInput && passwordInput) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let valid = true;
      const email = emailInput.value.trim();
      const pass = passwordInput.value.trim();

      if (!email || !email.includes("@")) {
        emailInput.classList.add("is-invalid");
        emailInput.focus();
        valid = false;
      } else emailInput.classList.remove("is-invalid");

      if (pass.length < 6) {
        passwordInput.classList.add("is-invalid");
        if (valid) passwordInput.focus();
        valid = false;
      } else passwordInput.classList.remove("is-invalid");

      if (valid) alert("✅ Login successful!");
    });

    emailInput.addEventListener("input", () => {
      if (emailInput.value.includes("@")) emailInput.classList.remove("is-invalid");
    });

    passwordInput.addEventListener("input", () => {
      if (passwordInput.value.length >= 6) passwordInput.classList.remove("is-invalid");
    });
  }

  /* =============================
      4) Sidebar Mobile Toggle
  ============================== */
  const menuToggle = document.getElementById("menuToggle");
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebar = document.querySelector(".sidebar-mobile");
  const overlay = document.getElementById("sidebarOverlay");

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("active");
    });

    if (closeSidebar) {
      closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
      });
    }

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  /* =============================
      5) Charts (Schedule + Status)
  ============================== */
  if (document.getElementById("visitSchedule")) {
    new Chart(document.getElementById("visitSchedule"), scheduleConfig);
  }

  if (document.getElementById("visitStatus")) {
    new Chart(document.getElementById("visitStatus"), statusConfig);
  }

  /* =============================
      6) Search / Reset / Export / Add New
  ============================== */
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const loc = document.getElementById("locationInput")?.value || "";
      const mail = document.getElementById("emailInput")?.value || "";
      const code = document.getElementById("codeInput")?.value || "";
      alert(`Search:\nLocation: ${loc}\nEmail: ${mail}\nCode: ${code}`);
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      ["locationInput", "emailInput", "codeInput"].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.value = "";
      });
    });
  }

  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => alert("Exporting to Excel..."));
  }

  const addNewBtn = document.getElementById("addNewBtn");
  if (addNewBtn) {
    addNewBtn.addEventListener("click", () => alert("Add new location clicked!"));
  }

  /* =============================
      7) Donut Charts
  ============================== */
  function createDonutChart(id) {
    const el = document.getElementById(id);
    if (!el) return;

    return new Chart(el, {
      type: "doughnut",
      data: {
        labels: ["Blue", "Green", "Red"],
        datasets: [
          {
            data: [72, 14, 3],
            backgroundColor: ["#0b72b5", "#8ad7af", "#d68586"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        }
      }
    });
  }

  createDonutChart("chart1");
  createDonutChart("chart2");

});
// ============================
//  View User Modal Trigger
// ============================

// نستخدم Delegation علشان الأيقونات بتتولد بالديناميك
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-pen")) {

    // استخراج الصف
    const row = e.target.closest("tr");
    const cols = row.querySelectorAll("td");

    // قراءة البيانات
    const name = cols[1].textContent.trim();
    const username = cols[1].textContent.trim().replace(" ", "").toLowerCase();
    const email = username + "@gmail.com";
    const password = "05151515";

    // تعبئة المودال
    document.getElementById("viewName").textContent = name;
    document.getElementById("viewUserName").textContent = username;
    document.getElementById("viewEmail").textContent = email;
    document.getElementById("viewPassword").textContent = password;

    // فتح المودال
    const modal = new bootstrap.Modal(document.getElementById("viewUserModal"));
    modal.show();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const notifications = [
    {
      title: "Notification title",
      text: "to increasing the number of characters generated by the application.",
      time: "3 hours ago",
    },
    {
      title: "Notification title",
      text: "to increasing the number of characters generated by the application.",
      time: "3 hours ago",
    },
    {
      title: "Notification title",
      text: "to increasing the number of characters generated by the application.",
      time: "3 hours ago",
    },
  ];

  const visits = [
    {
      name: "Khalid Mohammed",
      purpose: "Job interview",
      time: "12:15 PM",
      date: "2025-02-02",
      status: "Upcoming",
    },
    {
      name: "Khalid Mohammed",
      purpose: "Job interview",
      time: "12:15 PM",
      date: "2025-02-02",
      status: "Upcoming",
    },
  ];

  const notifyDiv = document.getElementById("notifications");
  notifications.forEach((n) => {
    notifyDiv.innerHTML += `
      <div class="note-item">
        <div class="d-flex justify-content-between">
          <strong>${n.title}</strong>
          <span class="text-muted">${n.time}</span>
        </div>
        <div class="text-muted mt-1">${n.text}</div>
      </div>
    `;
  });

  const visitsDiv = document.getElementById("visits");
  visits.forEach((v) => {
    visitsDiv.innerHTML += `
      <div class="visit-item">
        <div class="d-flex justify-content-between">
          <strong>${v.name}</strong>
          <span class="status">${v.status}</span>
        </div>

        <div class="text-muted mt-1">Purpose: ${v.purpose}</div>

        <div class="d-flex justify-content-between text-muted mt-1">
          <span>Time: ${v.time}</span>
          <span>Date: ${v.date}</span>
        </div>
      </div>
    `;
  });
});
 let totalItems = 361;
  let currentPage = 1;
  let itemsPerPage = 10;

  const paginationEl = document.getElementById("pagination");
  const rangeText = document.getElementById("rangeText");
  const select = document.getElementById("itemsPerPage");

  function renderPagination() {
    paginationEl.innerHTML = "";
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    // ← previous
    paginationEl.innerHTML += `
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="goTo(${currentPage - 1})">&lsaquo;</a>
      </li>`;

    // First page always visible
    paginationEl.innerHTML += pageBtn(1);

    // If far from page 1 → show dots
    if (currentPage > 4) paginationEl.innerHTML += dots();

    // Pages around current page
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) paginationEl.innerHTML += pageBtn(i);
    }

    // If far from last page → show dots
    if (currentPage < totalPages - 3) paginationEl.innerHTML += dots();

    // Last page always visible
    if (totalPages > 1) paginationEl.innerHTML += pageBtn(totalPages);

    // → next
    paginationEl.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="goTo(${currentPage + 1})">&rsaquo;</a>
      </li>`;

    updateRangeText();
  }

  function pageBtn(page) {
    return `
      <li class="page-item ${page === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="goTo(${page})">${page}</a>
      </li>`;
  }

  function dots() {
    return `<li class="page-item disabled"><a class="page-link">...</a></li>`;
  }

  function goTo(page) {
    if (page < 1) return;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    if (page > totalPages) return;
    currentPage = page;
    renderPagination();
  }

  function updateRangeText() {
    let start = (currentPage - 1) * itemsPerPage + 1;
    let end = Math.min(currentPage * itemsPerPage, totalItems);
    rangeText.innerHTML = `${start}-${end} of ${totalItems}`;
  }

  select.addEventListener("change", () => {
    itemsPerPage = Number(select.value);
    currentPage = 1;
    renderPagination();
  });

  renderPagination();
 document.getElementById("openRoleModal").addEventListener("click", function () {
  var modal = new bootstrap.Modal(document.getElementById("roleModal"));
  modal.show();
});
const roleModalEl = document.getElementById("roleModal");

roleModalEl.addEventListener("hidden.bs.modal", function () {
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  document.body.classList.remove('modal-open');
  document.body.style.overflow = "auto";
});
// عند الضغط على الـBox → يفتح اختيار الملفات
document.getElementById("uploadBox").addEventListener("click", () => {
  document.getElementById("fileUpload").click();
});

// عرض اسم الملف بعد الرفع
document.getElementById("fileUpload").addEventListener("change", function () {
  const fileName = this.files.length ? this.files[0].name : "";
  document.getElementById("fileName").textContent = fileName;
});
document.getElementById("openConfirmClose").addEventListener("click", function () {

  // اقفل المودال الأول
  let modal1 = bootstrap.Modal.getInstance(document.getElementById("roleModal"));
  modal1.hide();

  // افتح مودال التأكيد
  let confirmModal = new bootstrap.Modal(document.getElementById("confirmCloseModal"));
  confirmModal.show();
});
