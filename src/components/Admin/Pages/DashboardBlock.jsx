import {PiBooks, PiDownloadSimpleBold} from "react-icons/pi";
import {FaRegComments} from "react-icons/fa";

const DashboardBlocks = ({ totalBooks, totalComments, totalDownloads }) => {
    return (
        <>
            <div className="flex justify-between space-x-[5%] mt-5">
                <div
                    className="w-[30%] min-w-[185px] bg-blue-300 aspect-[10/7] rounded-xl flex flex-col items-center justify-center text-2xl font-[Kanit] max-lg:w-[50%] max-lg:h-36">
                    <PiBooks size={40}/>
                    <div>Total Books</div>
                    <div className="text-3xl font-[Jua] mt-1">{totalBooks}</div>
                </div>
                <div
                    className="w-[30%] min-w-[185px] bg-orange-300 aspect-[10/7] rounded-xl flex flex-col items-center justify-center text-2xl font-[Kanit] max-lg:w-[50%] max-lg:h-36">
                    <FaRegComments size={40} />
                    <div>Comments</div>
                    <div className="text-3xl font-[Jua] mt-1">{totalComments}</div>
                </div>
                <div
                    className="w-[30%] min-w-[185px] bg-purple-300 aspect-[10/7] rounded-xl flex flex-col items-center justify-center text-2xl font-[Kanit] max-lg:hidden">
                    <PiDownloadSimpleBold size={40} />
                    <div>Books Downloads</div>
                    <div className="text-3xl font-[Jua] mt-1">{totalDownloads}</div>
                </div>
            </div>

            <div
                className="hidden mt-4 w-[100%] min-w-[185px] bg-purple-300 h-36 rounded-xl flex-col items-center justify-center text-2xl font-[Kanit] max-lg:flex">
                <PiDownloadSimpleBold size={40} />
                <div>Books Downloads</div>
                <div className="text-3xl font-[Jua] mt-1">{totalDownloads}</div>
            </div>
        </>
    )
}

export default DashboardBlocks