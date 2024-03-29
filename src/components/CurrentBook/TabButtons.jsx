import {IoSettingsOutline} from "react-icons/io5";
import {AiOutlineFullscreen} from "react-icons/ai";

const TabButtons = ({ setIsFullScreen, setIsModalOpen }) => {
    return (
        <div className="space-x-3">
            <button
                className="bg-orange-300 rounded px-1 py-1 text-white relative right-0 self-end hover:text-orange-400 hover:bg-orange-200"
                onClick={() => setIsModalOpen(true)}
            >
                <IoSettingsOutline size={28}/>
            </button>

            <button
                className="bg-orange-300 rounded px-1 py-1 text-white relative right-0 self-end hover:text-orange-400 hover:bg-orange-200"
                onClick={() => setIsFullScreen(prev => !prev)}
            >
                <AiOutlineFullscreen size={28}/>
            </button>
        </div>
    )
}

export default TabButtons