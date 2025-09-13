import { Navigations } from "../config/navigation.config.js";

const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const complaintTableBody = document.getElementById("complaintTableBody");

// Load Navigation
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

// Complaints Data
const complaints = [
  { id: "CMP001", user: "John Doe", category: "Garbage", desc: "Garbage not collected for 3 days", status: "Pending", date: "2025-09-10" },
  { id: "CMP002", user: "Jane Smith", category: "Road", desc: "Potholes in main street", status: "In Progress", date: "2025-09-08" },
  { id: "CMP003", user: "Alex Khan", category: "Water", desc: "No water supply in the area", status: "Resolved", date: "2025-09-05" },
];

// Injecting dummy Complaints dynmically 
complaints.forEach(c => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${c.id}</td>
    <td>${c.user}</td>
    <td>${c.category}</td>
    <td>${c.desc}</td>
    <td><span class="status ${c.status.toLowerCase().replace(" ", "")}">${c.status}</span></td>
    <td>${c.date}</td>
    <td><button class="view-btn">View</button></td>
  `;
  complaintTableBody.appendChild(tr);
});
