import { Endpoints } from "../endpoints/api_endpoints.js";
const { register_user } = Endpoints


export const useRegister = async (name,ward,complaint) => {
     const payload = {
    name,
    ward,
    complaint
  };

    try {

        const requets = await fetch(register_user, {
            headers: {
      'Content-Type': 'application/json',
    },
            method: "POST",
            body: JSON.stringify(payload)
        });

        const response = await requets.json();
        return response;

    } catch (err) {
        throw new Error(err.message)
    }
}