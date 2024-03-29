import {Dropdown, IconButton, Menu, MenuButton, MenuItem} from "@mui/joy";
import {HiDotsHorizontal} from "react-icons/hi";
import AdminConfirmationModal from "./ConfirmationModal";
import {useNavigate} from "react-router-dom";

const AdminDropdownAndModalBooks = ({ open, setOpen, b, deleteBook }) => {

    const navigate = useNavigate()

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
                    <MenuItem onClick={() => handleCopy(b.id)}>Copy Id</MenuItem>
                    <MenuItem onClick={() => navigate("/books/" + b.id)}>Go To</MenuItem>
                    <MenuItem onClick={() => setOpen({ id: b.id, dialog: "delete_book" })}>Delete</MenuItem>
                </Menu>
            </Dropdown>

            {open && open.dialog === "delete_book" ? <AdminConfirmationModal open={open.id === b.id} setOpen={setOpen} content={`Are you sure you want to delete book - Id ${b.id}.`} onConfirm={() => deleteBook(b.id)} data={b} /> : "" }
        </>
    )
}

export default AdminDropdownAndModalBooks