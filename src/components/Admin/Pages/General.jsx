import TitleWithIcon from "./TitleWithIcon";
import {IoHomeOutline} from "react-icons/io5";
import AdminHomeSection from "./HomeSection";

const AdminGeneral = () => {
    return (
        <div>
            <div className="mb-5">
                <TitleWithIcon icon={<IoHomeOutline size={20} />} text="Home"/>
                <AdminHomeSection />
            </div>
        </div>
    )
}

export default AdminGeneral