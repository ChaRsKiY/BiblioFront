import AdminGeneral from "../../components/Admin/Pages/General";
import {useEffect} from "react";

const AdminGeneralPage = () => {
    useEffect(() => {
        document.title = "Biblio - Admin"
    }, []);

    return (
        <AdminGeneral />
    )
}

export default AdminGeneralPage