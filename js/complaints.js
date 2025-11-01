import { fetchComplaints } from "../hooks/complaints.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const modal = document.getElementById("loginModal");
  const complaintsList = document.getElementById("complaints-list");

  if (!token) {
    // Show popup if not logged in
    modal.style.display = "flex";
    return;
  }

  // Fetch and render complaints every 5 seconds
  const loadComplaints = async () => {
    console.log("Fetching complaints...");
    const complaintsData = await fetchComplaints();

    if (!complaintsData || complaintsData.status !== "success") {
      complaintsList.innerHTML = "<p class='error'>Failed to load complaints.</p>";
      return;
    }

    const complaints = complaintsData.data;

    if (complaints.length === 0) {
      complaintsList.innerHTML = "<p class='empty'>No complaints available.</p>";
      return;
    }

    complaintsList.innerHTML = complaints
      .map(
        (item) => `
        <div class="complaint-card">
          <div class="complaint-header">
            <h3>${item.name}</h3>
            <span class="status ${item.status}">${item.status}</span>
          </div>
          <p class="ward"><strong>Ward:</strong> ${item.ward}</p>
          <p class="complaint-text">${item.complaint}</p>
          ${
            item.imageUrl
              ? `<img src="${item.imageUrl}" alt="Complaint Image" class="complaint-img"/>`
              : ""
          }
          <p class="date"><i class="fa-regular fa-calendar"></i> ${item.created_at}</p>
        </div>`
      )
      .join("");
  };

  await loadComplaints();
  setInterval(loadComplaints, 5000);
});
