import { Navigations } from "../config/navigation.config.js";
import { fetchComplaints } from "../hooks/complaints.js";
const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const closePopup = document.querySelector(".close-popup");
  const statusSelect = document.getElementById("statusSelect");
  const editForm = document.getElementById("editForm");


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
  const complaints = await fetchComplaints();

  const tableBody = document.getElementById("complaintTableBody");

  // Inject rows dynamically
  complaints?.data?.forEach(c => {
    const row = document.createElement("tr");
    let statusColor;
  switch(c.status.toLowerCase()) {
    case "pending":
      statusColor = "#ff9800";
      break;
    case "resolved":
      statusColor = "#4caf50";
      break;
    case "in_progress":
      statusColor = "#2196f3";
      break;
    default:
      statusColor = "gray";
  }
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.complaint}</td>
      <td class="status" style="background: ${statusColor}; font-weight: bold; padding:2px 1px">${c.status}</td>
      <td><button class="edit-btn" data-id="${c.id}">Edit</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Popup handling
  
  let currentRow = null;

  // Delegated event listener for Edit buttons
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const row = e.target.closest("tr");
      currentRow = row;
      const currentStatus = row.querySelector(".status").innerText;
      statusSelect.value = currentStatus;
      popup.style.display = "flex";
    }
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Save updated status
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentRow) {
      currentRow.querySelector(".status").innerText = statusSelect.value;


      const updatedStatus= {
         status:statusSelect.value
      }


      console.log("Updated Status:", updatedStatus);
    }
    popup.style.display = "none";
  });
});
