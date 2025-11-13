import { Navigations } from "../config/navigation.config.js";
import { fetchUserDetails } from "../hooks/get_user_details.js";
import { updateUserRole } from "../hooks/update_role.js";
import { deleteUser } from "../hooks/delete_user.js";

const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const userTableBody = document.getElementById("userTableBody");

// Sidebar and navigation setup
Navigations.admin.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${item.link}">${item.icon} ${item.label}</a>`;
  navList.appendChild(li);
});

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


async function renderUsers() {
  const user_details = await fetchUserDetails();
  const usersData = user_details.data || [];


  userTableBody.innerHTML = "";

  usersData.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user?.id}</td>
      <td>${user?.username}</td>
      <td>${user?.email}</td>
      <td>
        <select class="role-select">
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
          <option value="citizen" ${user?.role === "citizen" ? "selected" : ""}>Citizen</option>
          <option value="ward_staff" ${user?.role === "ward_staff" ? "selected" : ""}>Ward Staff</option>
        </select>
      </td>
      <td>
        <button class="edit-btn">Update</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    userTableBody.appendChild(tr);

    // Update role
    tr.querySelector(".edit-btn").addEventListener("click", async () => {
      const role = tr.querySelector(".role-select").value;
      await updateUserRole(user.id, role);
      alert(`Role of ${user.username} updated to ${role}`);
    });

    // Delete user
    tr.querySelector(".delete-btn").addEventListener("click", async () => {
      if (confirm(`Are you sure you want to delete ${user.username}?`)) {
        const res = await deleteUser(user.id);
        alert(res.message || "User deleted");
        await renderUsers(); 
      }
    });
  });
}


renderUsers();
