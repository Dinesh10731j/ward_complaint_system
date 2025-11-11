import { Endpoints } from "../endpoints/api_endpoints.js";

const { ward_staff_report } = Endpoints;
// Fetch report data from the server
export const useWardStaffReport = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(ward_staff_report, {       

        method: "GET",
       headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ward staff report:", error);
    return { success: false, message: "Failed to fetch report data." };
  }
    };