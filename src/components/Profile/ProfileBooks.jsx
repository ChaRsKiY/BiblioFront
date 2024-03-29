import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import tokenStore from "../../stores/TokenStore";
import {HiDotsHorizontal} from "react-icons/hi";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {Dropdown, IconButton, Menu, MenuButton, MenuItem} from "@mui/joy";
import EditBookModal from "./EditBookModal";

const ProfileBooks = () => {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [isEditingOpen, setIsEditingOpen] = useState(false)

    const { token } = tokenStore
    const navigate = useNavigate()

    useEffect(() => {
        const getBooks = async () => {
            const result = await axios.get(`Book/get-books/${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            setBooks(result.data.books)
            setTotalPages(result.data.totalPages)
        }

        getBooks()
    }, []);

    return (
        <div className="flex flex-col">
            <Link to="/create-book" className="text-center bg-orange-300 text-white py-1.5 text-xl rounded-xl hover:bg-orange-400">Add Book</Link>

            <div className="space-y-3 mt-5">
                {books.map(el => (
                    <>
                        <div key={el.id} className="p-3 border rounded-xl border-neutral-300 flex justify-between items-center">
                            <div>
                                <div className="text-xl">{el.title}</div>
                                <div className="text-neutral-600 dark:text-neutral-300">{`${new Date(el.publicationDate).toLocaleTimeString().substring(0, 5)}, ${new Date(el.publicationDate).toLocaleDateString()}`}</div>
                            </div>

                            <Dropdown>
                                <MenuButton slots={{ root: IconButton }}
                                            slotProps={{ root: { color: 'neutral' } }}>
                                    <HiDotsHorizontal className="dark:text-white" />
                                </MenuButton>
                                <Menu>
                                    <MenuItem onClick={() => navigate(`/books/${el.id}`)}>Go To</MenuItem>
                                </Menu>
                            </Dropdown>
                        </div>
                        {isEditingOpen ? <EditBookModal setOpen={setIsEditingOpen} open={isEditingOpen} book={el} /> : ""}
                    </>
                ))}

                {totalPages > 1 && (
                    <div className="flex justify-center w-full space-x-2 pt-3">
                        {page > 1 && (
                            <button onClick={() => setPage(page - 1)} className="cursor-pointer disabled:text-red-900 dark:text-white"
                            >
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
        </div>
    )
}

export default ProfileBooks