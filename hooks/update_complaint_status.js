import { Endpoints } from "../endpoints/api_endpoints.js";

const {update_complaint_status} = Endpoints


export const updateComplaintStatus = async (statusData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(update_complaint_status, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(statusData)
    }); 
    const data = await response.json();
    return data;
  }
    catch (error) {
    console.error("Error updating complaint status:", error);
    return { success: false, message: "Failed to update complaint status." };
  }
};
