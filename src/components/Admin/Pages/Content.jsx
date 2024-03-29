import TitleWithIcon from "./TitleWithIcon";
import {LuClover} from "react-icons/lu";
import AdminGenresBlock from "./GenresBlock";
import {IoBookOutline} from "react-icons/io5";
import AdminBooksTable from "./BooksTable";
import {Link} from "react-router-dom";
import {FaRegComments} from "react-icons/fa";
import AdminCommentsTable from "./CommetsTable";
import {useEffect, useState, useTransition} from "react";
import queryString from "query-string";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";

const AdminContent = () => {
    const [books, setBooks] = useState([])
    const [booksTotalPages, setBooksTotalPages] = useState(0)
    const [booksPage, setBooksPage] = useState(1)
    const [booksSearchQuery, setBooksSearchQuery] = useState("")

    const [genres, setGenres] = useState([])
    const [comments, setComments] = useState([])
    const [commentsPage, setCommentsPage] = useState(1)
    const [commentsTotalPages, setCommentsTotalPages] = useState(0)

    const [addGenreInput, setAddGenreInput] = useState("")

    const queryParams = {
        page: booksPage,
        searchQuery: booksSearchQuery,
        pageSize: 10
    };

    const [isPending, startTransition] = useTransition()

    const { token } = tokenStore

    let abortController = new AbortController();
    const signal = abortController.signal;

    const getBooks = () => {
        try {
            startTransition(async () => {
                const queryStringParams = queryString.stringify(queryParams);
                const result = await axios.get(`Book?${queryStringParams}`, {signal})

                setBooks(result.data.books)
                setBooksTotalPages(result.data.totalPages)
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getBooks()
    }, [booksPage, booksSearchQuery]);

    const getGenres = async () => {
        const result = await axios.get("Genre")
        setGenres(result.data)
    }

    const getComments = async () => {
        const result = await axios.get("Comment/all-comments/" + commentsPage, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        setComments(result.data.comments)
        setCommentsTotalPages(result.data.totalPages)
    }

    useEffect(() => {
        getComments()
    }, [commentsPage]);

    useEffect(() => {
        getGenres()
    }, []);

    const handleSearchQueryChanged = (e) => {
        setBooksSearchQuery(e.target.value)
    }

    const handleAddGenreInputChanged = (e) => {
        setAddGenreInput(e.target.value)
    }

    const handleCreateGenre = async (e) => {
        e.preventDefault()

        setAddGenreInput("")

        await axios.post("Genre", { title: addGenreInput }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        getGenres()
    }

    const handleDeleteGenreClicked = async (genre) => {
        await axios.delete("Genre/" + genre.id , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        getGenres()
    }

    return (
        <>
            <div className="mb-5">
                <TitleWithIcon icon={<LuClover size={22}/>} text="Genres"/>
                <form className="h-12 py-2 mb-6" onSubmit={handleCreateGenre}>
                    <input onChange={handleAddGenreInputChanged} value={addGenreInput} placeholder="Genre name"
                       className="px-2 py-1 rounded border border-gray-400 outline-orange-300 mt-4 h-full dark:bg-neutral-600 dark:text-white dark:outline-neutral-800 dark:border-neutral-500"/>
                    <button type="submit" className="rounded text-white px-4 py-1 bg-orange-300 ml-3 h-full hover:bg-orange-400 duration-300">Add</button>
                </form>
                <AdminGenresBlock genres={genres} handleDeleteGenreClicked={handleDeleteGenreClicked} />
            </div>

            <div className="mb-5">
                <TitleWithIcon icon={<IoBookOutline size={22}/>} text="Books"/>
                <div className="pt-3 pb-2 dark:text-white">
                    <Link to="/create-book">Add new book</Link>
                </div>
                <input onChange={handleSearchQueryChanged} placeholder="Search" className="px-2 py-1 rounded border border-gray-400 outline-orange-300 dark:bg-neutral-600 dark:text-white dark:outline-neutral-800 dark:border-neutral-500" />
                <AdminBooksTable getBooks={getBooks} getComments={getComments} books={books} booksTotalPages={booksTotalPages} booksPage={booksPage} setBooksPage={setBooksPage} isPending={isPending} />
            </div>

            <div className="mb-5">
                <TitleWithIcon icon={<FaRegComments size={22} />} text="Comments"/>
                <AdminCommentsTable comments={comments} getComments={getComments} page={commentsPage} setPage={setCommentsPage} totalPages={commentsTotalPages} />
            </div>
        </>
    )
}

export default AdminContent