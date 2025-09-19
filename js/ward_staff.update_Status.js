import { Navigations } from "../config/navigation.config.js";

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




document.addEventListener("DOMContentLoaded", () => {
  const complaints = [
    { id: "U001", username: "Ram Thapa", complaint: "Street light not working", status: "Pending" },
    { id: "U002", username: "Sita Lama", complaint: "Garbage not collected", status: "In Progress" },
    { id: "U003", username: "Hari Shrestha", complaint: "Water supply issue", status: "Resolved" },
  ];

  const tableBody = document.getElementById("complaintTableBody");

  // Inject rows dynamically
  complaints.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.username}</td>
      <td>${c.complaint}</td>
      <td class="status">${c.status}</td>
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
