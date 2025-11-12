import { Navigations } from "../config/navigation.config.js";
import { fetchComplaints } from "../hooks/complaints.js";

const sidebar = document.getElementById("sidebar");
const navList = document.getElementById("navList");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const usernameEl = document.getElementById("username");
const totalEl = document.getElementById("totalComplaints");
const pendingEl = document.getElementById("pendingComplaints");
const inProgressEl = document.getElementById("inProgressComplaints");
const resolvedEl = document.getElementById("resolvedComplaints");

// Load Admin Menu
Navigations.admin.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${item.link}">${item.icon} ${item.label}</a>`;
  navList.appendChild(li);
});

// Toggle Sidebar
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Fetch Complaints and Update Dashboard
async function loadDashboard() {
  try {
    const response = await fetchComplaints(); // Call your API function
    const data = response.data; // Array of complaints
    const user = response.user.data; // User info

    // Set username
    usernameEl.textContent = user.username;

    // Calculate stats
    const total = data.length;
    const pending = data.filter(c => c.status === "pending").length;
    const inProgress = data.filter(c => c.status === "in_progress").length;
    const resolved = data.filter(c => c.status === "solved").length;

    // Update DOM
    totalEl.textContent = total;
    pendingEl.textContent = pending;
    inProgressEl.textContent = inProgress;
    resolvedEl.textContent = resolved;

  } catch (err) {
    console.error("Failed to load dashboard:", err);
  }
}

// Call function to load data
loadDashboard();
