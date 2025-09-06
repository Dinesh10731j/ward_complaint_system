// script/index.js
import { useRegister } from "../hooks/register_user.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('complaintForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop form from refreshing the page

    // Get values from the form
    const name = document.getElementById('name').value.trim();
    const ward = document.getElementById('ward').value;
    const complaint = document.getElementById('complaint').value.trim();

    // Call useRegister with input values
    const result = await useRegister(name, ward, complaint);

    // Show result to user
    if (result.status === 'success') {
      alert('Complaint submitted successfully!');
      form.reset(); // clear form
    } else {
      alert('Error: ' + result.message);
    }
  });
});
