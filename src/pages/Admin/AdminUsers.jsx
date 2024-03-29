import AdminUsers from "../../components/Admin/Pages/Users";
import {useEffect} from "react";

const AdminUsersPage = () => {

    useEffect(() => {
        document.title = "Biblio - Admin"
    }, []);

    return (
        <AdminUsers />
    )
}

export default AdminUsersPage