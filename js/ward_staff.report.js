import { Navigations } from "../config/navigation.config.js";
import { useWardStaffReport } from "../hooks/ward_staff_report.js";
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
document.addEventListener("DOMContentLoaded", async () => {
  // Dummy data


  const wardReport = await useWardStaffReport();
  

  // Inject numbers into summary cards
  document.getElementById("totalComplaints").innerText = wardReport?.data?.total;
  document.getElementById("pendingComplaints").innerText = wardReport?.data?.pending;
  document.getElementById("progressComplaints").innerText = wardReport?.data?.in_progress;
  document.getElementById("resolvedComplaints").innerText = wardReport?.data?.solved;

  // Complaints Trend (Line Chart)
  new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Complaints",
        data: wardReport?.data?.monthly,
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
        data: [wardReport?.data?.pending, wardReport?.data?.in_progress, wardReport?.data?.solved],
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
