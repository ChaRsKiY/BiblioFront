import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {SERVER_URL} from "../../data/urls";
import styles from './CurrentBook.module.scss'
import Loader from "../../components/Misc/Loader";
import TopContainer from "../../components/CurrentBook/TopContainer";
import ReadSection from "../../components/CurrentBook/ReadSection";
import {Button} from "@mui/joy";

const CurrentBook = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [page, setPage] = useState(1)
    const [content, setContent] = useState("")
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}Book/${bookId}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [bookId]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}Book/get-content/${book.content}`, {
                    params: {
                        page: page,
                        pageSize: 200
                    }
                });

                setContent(response.data.content)
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.error(error);
            }
        }

        if (book) {
            fetchContent()
        }
    }, [book, page]);

    return (
        <div className={styles.container}>
            {
                book ? (
                    <>
                        <TopContainer book={book} styles={styles} />
                        <ReadSection styles={styles} content={content} setPage={setPage} totalPages={totalPages} page={page} />
                    </>
                ) : (
                    <Loader/>
                )
            }
        </div>
    );
};

export default CurrentBook;
