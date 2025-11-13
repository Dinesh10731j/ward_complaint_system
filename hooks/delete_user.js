import { Endpoints } from "../endpoints/api_endpoints.js";

const { delete_role } = Endpoints;

export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(delete_role, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: userId })
        }); 
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, message: "Failed to delete user." };
    }   
};