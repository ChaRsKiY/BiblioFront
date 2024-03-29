import AdminDropdownAndModalComments from "./DropdownAndModalComments";
import {useState} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";

const AdminCommentsTable = ({comments, getComments, page, setPage, totalPages}) => {
    const [open, setOpen] = useState(null)

    const { token } = tokenStore

    const deleteComment = async (id) => {
        try {
            await axios.delete("Comment/delete-admin/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            getComments()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <table className="w-full table-auto mt-4 font-[Kanit] text-[1.1rem] space-x-1.5">
                <thead>
                <tr className="text-left text-gray-500 text-xl dark:text-gray-300">
                    <th className="pb-2 pr-2">Id</th>
                    <th className="pb-2">Posted</th>
                    <th className="pb-2">Content</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {comments.map((comment, index) => (
                    <tr key={index} className="hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-neutral-600">
                        <td className="pb-1 min-w-20">{comment.id}</td>
                        <td className="pb-1 min-w-20">{new Date(comment.createdAt).toLocaleDateString()}</td>
                        <td className="pb-1 min-w-20 max-w-32">{comment.content}</td>
                        <td>
                            <AdminDropdownAndModalComments deleteComment={deleteComment} open={open} setOpen={setOpen} c={comment} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="flex justify-center w-full space-x-2 mt-3">
                    {page > 1 && (
                        <button onClick={() => setPage(page - 1)} className="cursor-pointer disabled:text-red-900 dark:text-white">
                            <MdNavigateBefore size={25}/>
                        </button>
                    )}
                    {page !== totalPages && (
                        <button onClick={() => setPage(page + 1)} className="cursor-pointer disabled:text-red-900 dark:text-white">
                            <MdNavigateNext size={25} />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminCommentsTable