import { Navigations } from "../config/navigation.config.js";
import { fetchComplaints } from "../hooks/complaints.js";

const navList = document.getElementById("navList");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const complaintTableBody = document.getElementById("complaintTableBody");

// Load Navigation
Navigations.admin.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${item.link}">${item.icon} ${item.label}</a>`;
  navList.appendChild(li);
});

// Sidebar toggle
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

// ✅ Function to render complaints dynamically
async function renderComplaints() {
  try {
    const response = await fetchComplaints();
    if (response.status !== "success") {
      console.error("Error fetching complaints:", response.message);
      return;
    }

    const complaints = response.data || [];
    complaintTableBody.innerHTML = ""; // Clear old data

    complaints.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.ward}</td>
        <td>${c.complaint}</td>
        <td><span class="status ${c.status.toLowerCase()}">${c.status}</span></td>
        <td>${new Date(c.created_at).toLocaleDateString()}</td>
        <td>
          <img src="${c.imageUrl}" alt="Complaint Image" class="complaint-img" 
               style="width:70px; height:70px; object-fit:cover; cursor:pointer; border-radius:8px;">
        </td>
      `;
      complaintTableBody.appendChild(tr);

      // Open modal on image click
      const img = tr.querySelector(".complaint-img");
      img.addEventListener("click", () => openImageModal(c.imageUrl));
    });
  } catch (error) {
    console.error("Error loading complaints:", error);
  }
}

// ✅ Create modal for image preview
const modal = document.createElement("div");
modal.id = "imageModal";
modal.innerHTML = `
  <div class="modal-content">
    <span id="closeModal">&times;</span>
    <img id="modalImage" src="" alt="Complaint Image Preview">
  </div>
`;
document.body.appendChild(modal);

function openImageModal(src) {
  const modalImage = document.getElementById("modalImage");
  modalImage.src = src;
  modal.style.display = "flex";
}

document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Initial load
renderComplaints();
