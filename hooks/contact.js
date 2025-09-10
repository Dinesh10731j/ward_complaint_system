import { Endpoints } from "../endpoints/api_endpoints.js";


const { contact_user } = Endpoints



export const useContact = async (name, email, message) => {
    const payload = {
        name,
        email,
        message
    }
    try {
        const requets = await fetch(contact_user, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(payload)
        });
        const response = await requets.json();
        return response;
    }
    catch (err) {
        throw new Error(err.message)
    }
}