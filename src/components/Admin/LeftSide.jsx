import {FaBook, FaRegComments} from "react-icons/fa";
import {useLocation} from "react-router-dom";
import {IoHomeOutline, IoLogOutOutline, IoSettingsOutline} from "react-icons/io5";
import {MdContentCopy} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {GrUserAdmin} from "react-icons/gr";
import AdminSideBarLink from "./SideBarLink";
import AdminThemeSwitch from "./ThemeSwitch";

const AdminLeftSide = ({ handleLogOut }) => {
    const listClasses = {
        normal: "flex space-x-3 items-center text-xl cursor-pointer dark:text-white",
        selected: "flex space-x-3 items-center text-xl text-orange-400 cursor-pointer",
    }

    const pages = [
        {
            text: "Dashboard",
            icon: <IoHomeOutline />,
            path: "dashboard"
        },
        {
            text: "Content",
            icon: <MdContentCopy />,
            path: "content"
        },
        {
            text: "Users",
            icon: <FiUsers />,
            path: "users"
        },
        //{
        //    text: "General",
        //    icon: <IoSettingsOutline />,
        //    path: "general"
        //},
    ]

    const { pathname } = useLocation()

    return (
        <div className="flex flex-col items-center w-full">
            <div className="text-orange-400 flex space-x-3 items-center mb-9">
                <FaBook size={25}/>
                <div className="text-2xl font-[Kanit]">Biblio</div>
            </div>

            <ul className="space-y-8 text-gray-500 font-[Kanit] mt-5">
                {pages.map((el, key) => (
                    <div key={key}>
                        <AdminSideBarLink {...el} pathname={pathname} listClasses={listClasses} />
                    </div>
                ))}
            </ul>

            <div className="flex-grow w-full items-center justify-end flex flex-col space-y-4 ">
                <div className="w-5/6 h-0.5 bg-gray-200 bg-opacity-55 dark:bg-opacity-100 dark:bg-neutral-600"/>
                <div
                    className="cursor-pointer flex items-center text-xl text-gray-500 space-x-3 font-[Kanit] dark:text-white"
                    onClick={handleLogOut}>
                    <IoLogOutOutline/>
                    <span>Logout</span>
                </div>
                <AdminThemeSwitch />
            </div>
        </div>
    )
}

export default AdminLeftSide