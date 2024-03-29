import AdminDashboard from "../../components/Admin/Pages/Dashboard";
import {useEffect} from "react";

const AdminDashboardPage = () => {
    useEffect(() => {
        document.title = "Biblio - Admin"
    }, []);

    return (
        <AdminDashboard />
    )
}

export default AdminDashboardPage