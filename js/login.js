// login.js
import { useLogin } from "../hooks/login_user.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

      const response = await useLogin(email, password);

      if (response.status === "success") {
        alert(response.message || "Login successful!");
        form.reset();

        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }

        switch (response?.user?.role) {
          case "admin":
            window.location.href = "/dashboard/admin/dashboard.html";
            break;
          case "citizen":
            window.location.href = "/dashboard/citizen/dashboard.html";
            break;
          case "ward_staff":
            window.location.href = "/dashboard/ward_office_staff/dashboard.html";
            break;
          default:
            window.location.href = "/index.html";
        }

      } else {
        alert(response.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Please try again.");
    }
  });
});
