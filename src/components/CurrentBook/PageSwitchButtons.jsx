import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const PageSwitchButtons = ({ page, setPage, totalPages }) => {
    return (
        <div className="mx-auto space-x-4">
            <button disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className="rounded-full bg-orange-300 p-2 disabled:bg-orange-400"
            >
                <FaArrowLeft size={25} color="white"/>
            </button>
            <button disabled={page === totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                    className="rounded-full bg-orange-300 p-2 disabled:bg-orange-400"
            >
                <FaArrowRight size={25} color="white"/>
            </button>
        </div>
    )
}

export default PageSwitchButtons