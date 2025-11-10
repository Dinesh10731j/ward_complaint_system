import { Endpoints } from "../endpoints/api_endpoints.js";
const {wrad_staff_dashboard} = Endpoints



export const useWardStaffDashboard = async () => {
try{

    const requets = await fetch(wrad_staff_dashboard, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        method: "GET",
    });


    if(!requets.status === 200){
        throw new Error('Failed to fetch ward staff dashboard data');
    }
    const response = await requets.json();
    return response;


}catch(err){
    throw new Error(err.message)
}


}
    