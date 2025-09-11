import { Navigations } from "../config/navigation.config.js";

const sidebar = document.getElementById("sidebar");
const navList = document.getElementById("navList");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");

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
