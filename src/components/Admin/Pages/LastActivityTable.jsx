import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";

const LastActivityTable = ({lastActivities, page, setPage, isPending}) => {
    const activities = lastActivities.activities;
    const totalPages = lastActivities.totalItems;

    return (
        <div className="flex flex-col justify-center items-center">
            <table className="w-full table-auto mt-4 font-[Kanit] text-[1.1rem] space-x-1.5">
                <thead>
                <tr className="text-left text-gray-500 text-xl dark:text-gray-300">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {activities?.map(activity => (
                    <tr key={activity.id} className="hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-neutral-600">
                        <td className="pb-1">{activity.name}</td>
                        <td className="pb-1">{activity.email}</td>
                        <td className="pb-1">{new Date(activity.time).toUTCString()}</td>
                        <td className="pb-1">{activity.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="flex justify-center w-full space-x-2 mt-3">
                    {page > 1 && (
                        <button onClick={() => setPage(page - 1)} className="cursor-pointer disabled:text-red-900 dark:text-white"
                                disabled={isPending}>
                            <MdNavigateBefore size={25}/>
                        </button>
                    )}
                    {page !== totalPages && (
                        <button onClick={() => setPage(page + 1)} className="cursor-pointer disabled:text-red-900 dark:text-white" disabled={isPending}>
                            <MdNavigateNext size={25} />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default LastActivityTable