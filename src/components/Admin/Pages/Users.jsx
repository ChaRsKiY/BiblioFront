import TitleWithIcon from "./TitleWithIcon";
import {FaRegUser} from "react-icons/fa";
import AdminUsersTable from "./UsersTable";
import {GrUserAdmin} from "react-icons/gr";
import {useEffect, useState, useTransition} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [usersTotalPages, setUsersTotalPages] = useState(0)
    const [usersPage, setUsersPage] = useState(1)

    const [admins, setAdmins] = useState([])
    const [adminsTotalPages, setAdminsTotalPages] = useState(0)
    const [adminsPage, setAdminsPage] = useState(1)

    const [isPending, startTransition] = useTransition()


    const { token } = tokenStore;

    const getAdmins = () => {
        startTransition(async () => {
            const result = await axios.get("User/admins/" + adminsPage, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setAdmins(result.data.users)
            setAdminsTotalPages(result.data.totalPages)
        })
    }

    const getUsers = () => {
        startTransition(async () => {
            const result = await axios.get("User/" + usersPage, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setUsers(result.data.users)
            setUsersTotalPages(result.data.totalPages)
        })
    }

    useEffect(() => {
        getUsers()
    }, [usersPage]);

    useEffect(() => {
        getAdmins()
    }, [adminsPage]);

    const getAll = () => {
        getAdmins()
        getUsers()
    }

    return (
        <div>
            <div className="mb-9">
                <TitleWithIcon icon={<FaRegUser size={20}/>} text="Users"/>
                <AdminUsersTable users={users} totalPages={usersTotalPages} page={usersPage} setPage={setUsersPage} isPending={isPending} getAll={getAll} />
            </div>

            <div className="mb-9">
                <TitleWithIcon icon={<GrUserAdmin size={19} />} text="Admins"/>
                <AdminUsersTable users={admins} totalPages={adminsTotalPages} page={adminsPage} setPage={setAdminsPage} isPending={isPending} getAll={getAll} />
            </div>
        </div>
    )
}

export default AdminUsers