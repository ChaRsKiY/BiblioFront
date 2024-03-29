import {IoBookOutline, IoHomeOutline, IoMenu} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import userStore from "../../stores/UserStore";
import {useState} from "react";
import {VscDashboard} from "react-icons/vsc";
import {SlCalender} from "react-icons/sl";
import {LuClover} from "react-icons/lu";
import {FaRegComments, FaRegUser} from "react-icons/fa";
import {GrUserAdmin} from "react-icons/gr";
import {BiMessageAdd} from "react-icons/bi";

const AdminTopContainer = () => {
    const { user } = userStore;
    const [searchInput, setSearchInput] = useState("")

    const categories = [
        {
            icon: <VscDashboard size={22}/>,
            title: "Dashboard",
            hint: "Dashboard",
            path: "dashboard"
        },
        {
            icon: <SlCalender size={19}/>,
            title: "Last Activity",
            hint: "Dashboard",
            path: "dashboard"
        },
        {
            icon: <LuClover size={22}/>,
            title: "Genres",
            hint: "Content",
            path: "content"
        },
        {
            icon: <IoBookOutline size={22}/>,
            title: "Books",
            hint: "Content",
            path: "content"
        },
        {
            icon: <FaRegComments size={22}/>,
            title: "Comments",
            hint: "Content",
            path: "content"
        },
        {
            icon: <FaRegUser size={22}/>,
            title: "Users",
            hint: "Users",
            path: "users"
        },
        {
            icon: <GrUserAdmin size={22}/>,
            title: "Admins",
            hint: "Users",
            path: "users"
        },
        {
            icon: <IoHomeOutline size={22}/>,
            title: "Home",
            hint: "General",
            path: "general"
        },
        {
            icon: <BiMessageAdd size={22} />,
            title: "Add Genre",
            hint: "Genres",
            path: "content"
        },
    ]

    const navigate = useNavigate()

    const selectedCategories = categories.filter(el => el.title.toLowerCase().includes(searchInput.toLowerCase()))

    const handleSearchInputChanged = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div className="flex justify-between items-center space-x-4">
            <IoMenu size={40} className="text-orange-400 cursor-pointer"/>

            <div className="flex items-center justify-center w-[80%]">
                <div
                    className="relative duration-300 rounded-lg border border-gray-200 w-full dark:border-neutral-500">
                    <div className="flex">
                        <div
                            className="duration-300 flex w-12 items-center justify-center rounded-tl-lg rounded-bl-lg  bg-white p-5 dark:bg-neutral-600">
                            <svg viewBox="0 0 20 20" aria-hidden="true"
                                 className="pointer-events-none absolute w-5 fill-gray-500 transition">
                                <path
                                    d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                            </svg>
                        </div>
                        <input type="text"
                               onChange={handleSearchInputChanged}
                               className="duration-300 w-full bg-white pl-2 pr-2 text-base font-semibold outline-0 dark:bg-neutral-600 dark:text-white"
                               placeholder="Search here..." id=""/>
                    </div>
                    {searchInput && (
                        <div className="absolute bg-neutral-100 w-full space-y-1.5 rounded-xl mt-2 overflow-hidden dark:bg-neutral-500 dark:text-white">
                            {selectedCategories.map((el, index) => (
                                <div key={index}
                                     onClick={() => {
                                         navigate("/admin/" + el.path)
                                         setSearchInput("")
                                     }}
                                     className="flex items-center p-3 hover:bg-neutral-200 cursor-pointer dark:hover:bg-neutral-600 justify-between">
                                    <div className="flex space-x-2.5 items-center">
                                        {el.icon}
                                        <div>{el.title}</div>
                                    </div>
                                    <div className="pl-2 text-gray-400 italic text-[0.9rem]">{el.hint}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Link to="/profile" className="rounded-full overflow-hidden w-12 h-12">
                <img alt="Avatar Image"
                     src={"https://localhost:7000/User/avatar/" + user?.avatar}
                />
            </Link>
        </div>
    )
}

export default AdminTopContainer