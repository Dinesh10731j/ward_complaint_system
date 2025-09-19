import { Navigations } from "../config/navigation.config.js";

const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

// Load Navigation for Citizen
Navigations.ward_officer.forEach(item => {
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
document.addEventListener("DOMContentLoaded", () => {
  // Dummy data
  const reportData = {
    total: 120,
    pending: 35,
    progress: 50,
    resolved: 35,
    monthly: [10, 15, 20, 12, 18, 25, 10, 8, 15, 12, 18, 22]
  };

  // Inject numbers into summary cards
  document.getElementById("totalComplaints").innerText = reportData.total;
  document.getElementById("pendingComplaints").innerText = reportData.pending;
  document.getElementById("progressComplaints").innerText = reportData.progress;
  document.getElementById("resolvedComplaints").innerText = reportData.resolved;

  // Complaints Trend (Line Chart)
  new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Complaints",
        data: reportData.monthly,
        borderColor: "#004aad",
        backgroundColor: "rgba(0, 74, 173, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });

  // Complaint Status Distribution (Pie Chart)
  new Chart(document.getElementById("statusChart"), {
    type: "pie",
    data: {
      labels: ["Pending", "In Progress", "Resolved"],
      datasets: [{
        data: [reportData.pending, reportData.progress, reportData.resolved],
        backgroundColor: ["#ff9800", "#2196f3", "#4caf50"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } }
    }
  });

  // Export buttons (dummy actions for now)
  document.querySelectorAll(".export-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Export feature coming soon!");
    });
  });
});
