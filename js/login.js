// login.js
import { useLogin } from "../hooks/login_user.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values from form
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      // Call login hook
      const response = await useLogin(email, password);
      console.log("✅ Login Response:", response);

      if (response.status === "success") {
        alert(response.message || "Login successful!");
        form.reset();

        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }

        window.location.href = "./dashboard.html";
      } else {
        alert(response.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Please try again.");
    }
  });
});
