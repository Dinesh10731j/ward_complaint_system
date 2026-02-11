import { Navigations } from "../config/navigation.config.js";
import { useCitizenDashboard } from "../hooks/citizen_dashboard.js";
const navList = document.getElementById("citizenNav");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

// Load Navigation for Citizen
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

// Load dashboard data and populate stats
const greetingEl = document.getElementById('greeting');
const totalEl = document.getElementById('totalComplaints');
const pendingEl = document.getElementById('pendingComplaints');
const progressEl = document.getElementById('progressComplaints');
const resolvedEl = document.getElementById('resolvedComplaints');

const loadDashboard = async () => {
  try {
    const resp = await useCitizenDashboard();
    // Backend shape example:
    // {
    //   status, message,
    //   data: { "Total": 2, "Pending": 0, "In Progress": 1, "Resolved": 1 },
    //   user: { data: { username, ... } }
    // }

    const userName = resp?.user?.data?.username || resp?.user?.username || 'Citizen';
    const stats = resp?.data || {};

    if (greetingEl) greetingEl.innerText = `Hello, ${userName} 👋`;
    if (totalEl) totalEl.innerText = (stats['Total'] ?? 0);
    if (pendingEl) pendingEl.innerText = (stats['Pending'] ?? 0);
    if (progressEl) progressEl.innerText = (stats['In Progress'] ?? stats['InProgress'] ?? 0);
    if (resolvedEl) resolvedEl.innerText = (stats['Resolved'] ?? 0);
  } catch (err) {
    console.error('Failed to load citizen dashboard:', err);
  }
};

loadDashboard();
