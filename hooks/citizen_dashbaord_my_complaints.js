import { Endpoints } from "../endpoints/api_endpoints.js";
const {citizen_dashboard_my_complaints} = Endpoints;


export const useCitizenDashboardMyComplaints = async () => {
try{
    const request = await fetch(citizen_dashboard_my_complaints, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        method: "GET",
    }); 
    if (request.status !== 200) {
        const text = await request.text().catch(() => null);
        throw new Error('Failed to fetch citizen complaints data: ' + (text || request.status));
    }
    const response = await request.json();
    return response;
}catch(err){
    throw new Error(err.message)
}
}
