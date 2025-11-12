import { Endpoints } from "../endpoints/api_endpoints.js";
const { get_complaints } = Endpoints;

export const fetchComplaints = async () => {
  try {
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem("authToken"); // Make sure this matches your storage key

    // Send request with Authorization header
    const response = await fetch(get_complaints, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // attach token here
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
  }
};

