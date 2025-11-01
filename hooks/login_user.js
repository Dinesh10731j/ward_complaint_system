import { Endpoints } from "../endpoints/api_endpoints.js";
const {login_user} = Endpoints


export const useLogin = async (email,password) => {
     const payload = {
    email,
    password
  };
    try {
        const requets = await fetch(login_user, {
            headers: {
      'Content-Type': 'application/json',
    },
            method: "POST",
            body: JSON.stringify(payload)
        });
        const response = await requets.json();

        console.log("This is the response from the login",response ?? "No respoonse from the server")
        return response;
    } catch (err) {
        throw new Error(err.message)
    }
}