import {CiDark, CiLight} from "react-icons/ci";
import {useTheme} from "../../utils/contexts/ThemeProvider";

const AdminThemeSwitch = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div
            className="cursor-pointer flex items-center text-xl text-gray-500 space-x-3 font-[Kanit] dark:text-white">
            <label className="flex items-center space-x-2" htmlFor="theme-switch">
                {theme === "dark" ? <CiDark/> : <CiLight/>}
                <span>Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input id="theme-switch" className="sr-only peer" checked={theme === "dark"} type="checkbox"
                           onChange={toggleTheme}/>
                    <div
                        className="peer rounded-full outline-none duration-100 after:duration-500 w-14 h-7 bg-orange-400 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-blue-500 after:absolute after:outline-none after:rounded-full after:h-6 after:w-6 after:bg-white after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center after:font-bold peer-checked:after:translate-x-7 peer-checked:after:border-white">
                    </div>
                </label>
            </label>
        </div>
    )
}

export default AdminThemeSwitch