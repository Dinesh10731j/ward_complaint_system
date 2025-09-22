import { Navigations } from "../config/navigation.config.js";
import { registerComplaint } from "../hooks/register_complaint.js";
const navList = document.getElementById("citizenNav");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

const complaintForm = document.getElementById("complaintForm");

complaintForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("username").value);
  formData.append("ward", document.getElementById("ward").value);
  formData.append("complaint", document.getElementById("complaint").value);

  const imageFile = document.getElementById("image").files[0];
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const result = await registerComplaint(formData);
    console.log("Complaint submitted:", result);
    alert("Complaint submitted successfully!");
    complaintForm.reset();
  } catch (err) {
    console.error(err);
    alert("Failed to submit complaint");
  }
});

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
