import AdminContent from "../../components/Admin/Pages/Content";
import {useEffect} from "react";

const AdminContentPage = () => {
    useEffect(() => {
        document.title = "Biblio - Admin"
    }, []);

    return (
        <AdminContent />
    )
}

export default AdminContentPage