import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './CurrentBook.module.scss'
import Loader from "../../components/Misc/Loader";
import TopContainer from "../../components/CurrentBook/TopContainer";
import ReadSection from "../../components/CurrentBook/ReadSection";
import Cookies from "js-cookie";
import CommentSection from "../../components/CurrentBook/CommentSection";
import AddCommentSection from "../../components/CurrentBook/AddCommentSection";
import tokenStore from "../../stores/TokenStore";
import userStore from "../../stores/UserStore";

const CurrentBook = () => {
    const { bookId } = useParams();
    const { token } = tokenStore

    const { user } = userStore

    const [comments, setComments] = useState([])

    const [book, setBook] = useState(null);
    const [page, setPage] = useState(1)
    const [content, setContent] = useState("")
    const [totalPages, setTotalPages] = useState(null)
    const [settings, setSettings] = useState(
        {
            textsize: Cookies.get("textsize") || 1
        })

    useEffect(() => {
        document.title = "Biblio - Read"
    }, [])

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`Book/${bookId}`);
                setBook(response.data);
            } catch (error) {
                if (error.response.status === 404)
                {
                    navigate('/books')
                }
            }
        };

        fetchBook();
    }, [bookId]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`Book/get-content/${book.content}`, {
                    params: {
                        page: page,
                        pageSize: 350
                    }
                });

                if (user && page > 1)
                    await axios.put(`Book/set-as-read/${bookId}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                setContent(response.data.content)
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.error(error)
            }
        }

        if (book) {
            fetchContent()
        }
    }, [book, page, settings]);

    const getComment = async (page, setTotalPages) => {
        const result = await axios.get(`Comment`, {
            params: {
                bookId: bookId,
                page: page
            }
        });

        setComments(result.data.comments)

        if(setTotalPages)
            setTotalPages(result.data.totalPages || 1)
    }

    return (
        <div className={styles.container}>
            {
                book ? (
                    <div>
                        <TopContainer book={book} styles={styles} />
                        <ReadSection styles={styles} content={content} setPage={setPage} totalPages={totalPages} page={page} setSettings={setSettings} settings={settings} bookId={bookId} />

                        <div className="mt-12 text-2xl text-center font-[Jua] text-gray-600">Comments</div>

                        {user && <AddCommentSection bookId={bookId} getComment={getComment} />}
                        <CommentSection comments={comments} getComment={getComment} />
                    </div>
                ) : (
                    <Loader/>
                )
            }
        </div>
    );
};

export default CurrentBook;
