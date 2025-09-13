import { Navigations } from "../config/navigation.config.js";

const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const userTableBody = document.getElementById("userTableBody");

// Load Navigation (same sidebar behavior)
Navigations.admin.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${item.link}">${item.icon} ${item.label}</a>`;
  navList.appendChild(li);
});

// Sidebar toggle
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

// Sample Users
const users = [
  { id: "U001", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "U002", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "U003", name: "Alex Khan", email: "alex@example.com", role: "User" }
];

// Inject Users
users.forEach(user => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>
      <select class="role-select">
        <option value="Admin" ${user.role === "Admin" ? "selected" : ""}>Admin</option>
        <option value="User" ${user.role === "User" ? "selected" : ""}>User</option>
      </select>
    </td>
    <td>
      <button class="edit-btn">Update</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  userTableBody.appendChild(tr);

  // Optional: add click events
  tr.querySelector(".edit-btn").addEventListener("click", () => {
    const role = tr.querySelector(".role-select").value;
    alert(`Role of ${user.name} updated to ${role}`);
  });

  tr.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      tr.remove();
    }
  });
});
