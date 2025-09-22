import { Endpoints } from "../endpoints/api_endpoints.js";
const { ciziten_complaint } = Endpoints;


export const registerComplaint = async (complaintData) => {






    try {

        const response = await fetch(ciziten_complaint, {
            method: "POST",
            body: complaintData
        });



        const data = await response.json();



        return data;

    } catch (error) {
        throw new Error("Error registering complaint");
    }
}