import { Navigations } from "../config/navigation.config.js";

const navList = document.getElementById("citizenNav");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const complaintTableBody = document.getElementById("complaintTableBody");
const modal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");
const editWard = document.getElementById("editWard");
const editComplaint = document.getElementById("editComplaint");




Navigations.citizen.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${item.link}">${item.icon} ${item.label}</a>`;
  navList.appendChild(li);
});

// Sidebar toggle (mobile)
menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});





// Dummy complaint data
let complaints = [
  { userId: 1, username: "Ravi Kumar", ward: 2, status: "Pending", complaint: "Street light not working" },
  { userId: 2, username: "Ravi", ward: 6, status: "In Progress", complaint: "Water supply issue" },
  { userId: 3, username: "Sita", ward: 4, status: "Resolved", complaint: "Garbage not collected" }
];

// Render complaints into the table
let editIndex = null;

// Render complaints
function renderComplaints() {
  complaintTableBody.innerHTML = "";
  complaints.forEach((c, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.userId}</td>
      <td>${c.username}</td>
      <td>${c.ward}</td>
      <td>${c.status}</td>
      <td>${c.complaint}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    // Edit button
    row.querySelector(".edit-btn").addEventListener("click", () => {
      editIndex = index;
      editWard.value = c.ward;
      editComplaint.value = c.complaint;
      modal.style.display = "flex";
    });

    // Delete button
    row.querySelector(".delete-btn").addEventListener("click", () => {
      complaints.splice(index, 1);
      renderComplaints();
    });

    complaintTableBody.appendChild(row);
  });
}

// Save edited data
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editIndex !== null) {
    complaints[editIndex].ward = editWard.value;
    complaints[editIndex].complaint = editComplaint.value;
    console.log("Updated complaint:", complaints[editIndex]); // ✅ log to console
    modal.style.display = "none";
    renderComplaints();
  }
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal on background click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Initial render
renderComplaints();

