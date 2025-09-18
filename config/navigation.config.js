export const Navigations = {
  admin: [
    { label: "Dashboard", icon: "📊", link: "/dashboard/admin/dashboard.html" },
    { label: "Manage Users", icon: "👥", link: "/dashboard/admin/manageUser.html" },
    { label: "Reports", icon: "📄", link: "/dashboard/admin/ComplaintsReport.html" },
  ],
  ward_officer: [
    { label: "Ward Dashboard", icon: "🏘️", link: "#ward-dashboard" },
    { label: "Citizen Requests", icon: "📩", link: "#requests" },
    { label: "Reports", icon: "📄", link: "#ward-reports" },
  ],
  citizen: [
    { label: "Home", icon: "🏠", link: "/dashboard/citizen/dashboard.html" },
    { label: "Register Complaint", icon: "📝", link: "/dashboard/citizen/complaint.html" },
    { label: "My Complaints", icon: "📂", link: "/dashboard/citizen/my_Complaint.html" },
  ],
};
