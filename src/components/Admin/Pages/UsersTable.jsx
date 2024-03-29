import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {useState} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";
import userStore from "../../../stores/UserStore";
import AdminDropdownAndModalUsers from "./DropdownAndModalUsers";

const AdminUsersTable = ({ users, setPage, page, totalPages, isPending, getAll }) => {
    const [open, setOpen] = useState(null)

    const { token } = tokenStore;
    const { user } = userStore;

   const addAdmin = async (user) => {
        await axios.post("Admin/add", { id: user.id }, {
          headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        getAll()
    }

    const deleteAdmin = async (user) => {
        await axios.post("Admin/delete", { id: user.id }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        getAll()
    }

    const deleteUser = async (user) => {
        await axios.delete("User/delete/" + user.id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        getAll()
    }

    return (
        <div className="flex justify-center items-center">
            <table className="w-full table-auto mt-4 font-[Kanit] text-[1.1rem] space-x-1.5">
                <thead>
                <tr className="text-left text-gray-500 text-xl dark:text-gray-300">
                    <th className="pb-2">Id</th>
                    <th className="pb-2">Login</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2"></th>
                </tr>
                </thead>
                <tbody>
                {user && users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-neutral-600">
                        <td className="pb-1 ">{u.id}</td>
                        <td className="pb-1">{u.userName}</td>
                        <td className="pb-1">{u.email}</td>
                        <td className="pb-1">{u.name}</td>
                        <td className="flex items-center justify-center">
                            <AdminDropdownAndModalUsers getAll={getAll} deleteUser={deleteUser} addAdmin={addAdmin} user={user} setOpen={setOpen} open={open} deleteAdmin={deleteAdmin}  u={u} />
                        </td>
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

export default AdminUsersTable