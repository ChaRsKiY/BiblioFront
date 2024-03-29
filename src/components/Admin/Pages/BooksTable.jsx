import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import AdminDropdownAndModalBooks from "./DropdownAndModalBooks";
import {useState} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";

const AdminBooksTable = ({ books, booksTotalPages, booksPage, setBooksPage, isPending, getBooks, getComments }) => {
    const [open, setOpen] = useState(false)

    const { token } = tokenStore

    const deleteBook = async (bookId) => {
        try {
            await axios.delete("Book/" + bookId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            getBooks()
            getComments()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <table className="w-full table-auto mt-4 font-[Kanit] text-[1.1rem] space-x-1.5">
                <thead>
                <tr className="text-left text-gray-500 text-xl dark:text-gray-300">
                    <th className="pb-2 min-w-7">Id</th>
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Author</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => (
                    <tr key={index} className="hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-neutral-600">
                        <td className="pb-1 ">{book.id}</td>
                        <td className="pb-1">{book.title}</td>
                        <td className="pb-1">{book.author}</td>
                        <td>
                            <AdminDropdownAndModalBooks open={open} setOpen={setOpen} b={book} deleteBook={deleteBook} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {booksTotalPages > 1 && (
                <div className="flex justify-center w-full space-x-2 mt-3">
                    {booksPage > 1 && (
                        <button onClick={() => setBooksPage(booksPage - 1)} className="cursor-pointer disabled:text-red-900 dark:text-white"
                                disabled={isPending}>
                            <MdNavigateBefore size={25}/>
                        </button>
                    )}
                    {booksPage !== booksTotalPages && (
                        <button onClick={() => setBooksPage(booksPage + 1)} className="cursor-pointer disabled:text-red-900 dark:text-white" disabled={isPending}>
                            <MdNavigateNext size={25} />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminBooksTable