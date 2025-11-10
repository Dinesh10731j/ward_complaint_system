import { Navigations } from "../config/navigation.config.js";
import { useWardStaffDashboard } from "../hooks/ward_staff.dashboard.js";

const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

// Elements for stats
const totalUsersEl = document.getElementById("totalUsers");
const totalPendingEl = document.getElementById("totalPending");
const totalInProgressEl = document.getElementById("totalInProgress");
const totalResolvedEl = document.getElementById("totalResolved");
const usernameEl = document.getElementById("username");

(async () => {
  try {
    // Fetch dashboard data from API
    const res = await useWardStaffDashboard();

    if (res.success && res.data) {
      const { pending, in_progress, resolved, total_users } = res.data;

      // ✅ Update stats dynamically
      totalUsersEl.textContent = total_users;
      totalPendingEl.textContent = pending;
      totalInProgressEl.textContent = in_progress;
      totalResolvedEl.textContent = resolved;
    } else {
      console.warn("Invalid dashboard response", res);
    }

    // Example: set username (can be fetched from localStorage/session if available)
    const storedName = localStorage.getItem("ward_staff_name") || "Ward Staff";
    usernameEl.textContent = storedName;

    // ✅ Load Navigation Items
    Navigations.ward_officer.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.link}">${item.icon} ${item.label}</a>`;
      navList.appendChild(li);
    });

    // ✅ Sidebar toggle (mobile)
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
  } catch (err) {
    console.error("Error loading dashboard:", err);
  }
})();
