import { Endpoints } from "../endpoints/api_endpoints.js";
const { update_role } = Endpoints;

export const updateUserRole = async (userId, newRole) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(update_role, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: userId, new_role: newRole })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, message: "Failed to update user role." };
    }
};
