import { Navigations } from "../config/navigation.config.js";
import { useCitizenDashboardMyComplaints } from "../hooks/citizen_dashbaord_my_complaints.js";

const navList = document.getElementById("citizenNav");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const complaintTableBody = document.getElementById("complaintTableBody");
const modal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");
const editWard = document.getElementById("editWard");
const editComplaint = document.getElementById("editComplaint");
const imageModal = document.getElementById('imageModal');
const lightboxImage = document.getElementById('lightboxImage');
const closeImageModal = document.getElementById('closeImageModal');




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





// Complaints will be loaded from backend
let complaints = [];

const fetchComplaints = async () => {
  try {
    // Use the provided hook which handles the backend call and auth
    const payload = await useCitizenDashboardMyComplaints();
    const items = payload?.data || [];

    // Map backend items to table model
    complaints = items.map(i => ({
      userId: i.id,
      username: i.name || i.username || '',
      ward: i.ward || '',
      status: i.status || '',
      complaint: i.complaint || '',
      imageUrl: i.imageUrl || i.image || '',
      created_at: i.created_at || ''
    }));

    renderComplaints();
  } catch (err) {
    console.error('Error loading complaints via hook:', err);
    renderComplaints();
  }
};

// Render complaints into the table
let editIndex = null;

// Render complaints
function renderComplaints() {
  complaintTableBody.innerHTML = "";
  complaints.forEach((c, index) => {
    const row = document.createElement("tr");
    const statusClass = getStatusClass(c.status);
    const statusLabel = formatStatusLabel(c.status);
    row.innerHTML = `
      <td>${c.userId}</td>
      <td>${c.username}</td>
      <td>${c.ward}</td>
      <td>${c.imageUrl ? `<img src="${c.imageUrl}" class="thumb-img" data-index="${index}" alt="complaint image">` : ''}</td>
      <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
      <td>${c.complaint}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    // Edit button
    row.querySelector(".edit-btn").addEventListener("click", () => {
      editIndex = index;
      editWard.value = c.ward;
      editComplaint.value = c.complaint;
      modal.style.display = "flex";
    });

    // Delete button
    row.querySelector(".delete-btn").addEventListener("click", () => {
      complaints.splice(index, 1);
      renderComplaints();
    });

    // Thumbnail click -> open lightbox
    const thumb = row.querySelector('.thumb-img');
    if (thumb) {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageModal(c.imageUrl);
      });
    }

    complaintTableBody.appendChild(row);
  });
}

// Helper: normalize status to a CSS class
function getStatusClass(status) {
  if (!status) return 'status-default';
  const s = String(status).toLowerCase().trim();
  if (s === 'pending') return 'status-pending';
  if (s === 'in progress' || s === 'in_progress' || s === 'in-progress' || s === 'inprogress') return 'status-in-progress';
  if (s === 'solved' || s === 'resolved') return 'status-solved';
  if (s === 'rejected' || s === 'closed') return 'status-rejected';
  return 'status-default';
}

function formatStatusLabel(status) {
  if (!status) return '';
  return String(status).replace(/_/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
}

// Save edited data
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editIndex !== null) {
    complaints[editIndex].ward = editWard.value;
    complaints[editIndex].complaint = editComplaint.value;
    console.log("Updated complaint:", complaints[editIndex]);
    modal.style.display = "none";
    renderComplaints();
  }
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal on background click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Image modal handling
function openImageModal(src) {
  if (!imageModal || !lightboxImage) return;
  lightboxImage.src = src || '';
  imageModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeImageModalFn() {
  if (!imageModal || !lightboxImage) return;
  imageModal.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

if (closeImageModal) {
  closeImageModal.addEventListener('click', () => closeImageModalFn());
}

if (imageModal) {
  imageModal.addEventListener('click', (e) => {
    // close when clicking on backdrop (not the image)
    if (e.target === imageModal) closeImageModalFn();
  });
}

// close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImageModalFn();
});

// Initial render
fetchComplaints();

