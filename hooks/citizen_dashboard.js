import { Endpoints } from "../endpoints/api_endpoints.js";
const {citizen_dashboard} = Endpoints;



export const useCitizenDashboard = async () => {
try{
    const request = await fetch(citizen_dashboard, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        method: "GET",
    });
    if (request.status !== 200) {
        const text = await request.text().catch(() => null);
        throw new Error('Failed to fetch citizen dashboard data: ' + (text || request.status));
    }
    const response = await request.json();
    return response;
}catch(err){
    throw new Error(err.message)
}
}