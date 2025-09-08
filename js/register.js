// register.js
import { useRegister } from "../hooks/register_user.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
     
      const response = await useRegister(username, email, password,confirmPassword);
      console.log("✅ Registered:", response);

      if (response.status === "success") {
        alert(response.message ?? "Registration successful!");
        form.reset();
        window.location.href = "./login.html"; 
      } else {
        alert(response.message || "Registration failed!");
      }
    } catch  {
      alert("Something went wrong. Please try again.");
    }
  });
});
