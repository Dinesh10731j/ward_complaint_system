import { Endpoints } from "../endpoints/api_endpoints.js";

const { user_details } = Endpoints;



export const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(user_details, {
        method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { success: false, message: "Failed to fetch user details." };
  }
};