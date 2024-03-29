import {Dropdown, IconButton, Menu, MenuButton, MenuItem} from "@mui/joy";
import {HiDotsHorizontal} from "react-icons/hi";
import AdminConfirmationModal from "./ConfirmationModal";
import AdminEditUserModal from "./EditUserModal";
import AdminSendEmailModal from "./SendEmailModal";

const AdminDropdownAndModalUsers = ({ getAll, u, user, deleteUser, open, setOpen, addAdmin, deleteAdmin }) => {

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <>
            <Dropdown>
                <MenuButton slots={{ root: IconButton }}
                            slotProps={{ root: { color: 'neutral' } }}>
                    <HiDotsHorizontal className="dark:text-white" />
                </MenuButton>
                <Menu>
                    <MenuItem onClick={() => handleCopy(u.id)}>Copy Id</MenuItem>
                    <MenuItem onClick={() => setOpen({ id: u.id, dialog: "edit_user" })}>Edit</MenuItem>
                    {user.userId !== u.id.toString() ? (
                        <>
                            {!u.isAdmin ? <MenuItem onClick={() => setOpen({ id: u.id, dialog: "set_admin" })}>Set Admin</MenuItem> : <MenuItem onClick={() => setOpen({ id: u.id, dialog: "set_admin" })}>Delete Admin</MenuItem>}
                            <MenuItem onClick={() => setOpen({ id: u.id, dialog: "send_email" })}>Send Email</MenuItem>
                            <MenuItem onClick={() => setOpen({ id: u.id, dialog: "delete_user" })}>Delete</MenuItem>
                        </>
                    ) : null}
                </Menu>
            </Dropdown>

            {open && open.dialog === "set_admin" ? !u.isAdmin ? <AdminConfirmationModal open={open.id === u.id} setOpen={setOpen} content={`Are you sure you want to set ${u.userName} as admin.`} onConfirm={addAdmin} data={u} />
                : <AdminConfirmationModal open={open.id === u.id} setOpen={setOpen} content={`Are you sure you want to delete admin rules from ${u.userName}.`} onConfirm={deleteAdmin} data={u} /> : "" }

            {open && open.dialog === "delete_user" ? <AdminConfirmationModal open={open.id === u.id} setOpen={setOpen} content={`Are you sure you want to delete user ${u.userName}.`} onConfirm={deleteUser} data={u} /> : "" }

            {open && open.dialog === "edit_user" ? <AdminEditUserModal getAll={getAll} open={open.id === u.id} setOpen={setOpen} userId={u.id} /> : "" }

            {open && open.dialog === "send_email" ? <AdminSendEmailModal open={open.id === u.id} setOpen={setOpen} userId={u.id} /> : "" }
        </>
    )
}

export default AdminDropdownAndModalUsers