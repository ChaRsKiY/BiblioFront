import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import tokenStore from "../../stores/TokenStore";
import userStore from "../../stores/UserStore";
import AdminLeftSide from "./LeftSide"
import AdminTopContainer from "./TopContainer";

const AdminLayout = ({ children }) => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        Cookies.set("token", null, {expires: new Date(0)})
        tokenStore.setToken(null)
        userStore.setUser(null)
        navigate('/');
    }

    return (
        <div className="flex w-full min-h-svh py-7">
            <div className="flex w-64 border-r border-gray-200 dark:border-neutral-600">
                <AdminLeftSide handleLogOut={handleLogOut} />
            </div>
            <div className="flex-1 px-10 flex flex-col">
                <AdminTopContainer />
                <div className="flex-grow mt-8">{children}</div>
            </div>
        </div>
    )
}

export default AdminLayout