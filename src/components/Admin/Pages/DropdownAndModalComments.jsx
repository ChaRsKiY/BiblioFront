import {Dropdown, IconButton, Menu, MenuButton, MenuItem} from "@mui/joy";
import {HiDotsHorizontal} from "react-icons/hi";
import AdminConfirmationModal from "./ConfirmationModal";

const AdminDropdownAndModalComments = ({ c, open, setOpen, deleteComment }) => {

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
                    <MenuItem onClick={() => handleCopy(c.id)}>Copy Id</MenuItem>
                    <MenuItem onClick={() => handleCopy(c.content)}>Copy Comment</MenuItem>
                    <MenuItem onClick={() => setOpen({ id: c.id, dialog: "delete_comment" })}>Delete</MenuItem>
                </Menu>
            </Dropdown>

            {open && open.dialog === "delete_comment" ? <AdminConfirmationModal open={open.id === c.id} setOpen={setOpen} content={`Are you sure you want to delete comment - Id ${c.id}.`} onConfirm={() => deleteComment(c.id)} data={c} /> : "" }
        </>
    )
}

export default AdminDropdownAndModalComments