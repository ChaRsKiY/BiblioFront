import Filters from "../../components/Books/Filters";
import Content from "../../components/Books/Content";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/urls";
import queryString from "query-string";
import searchQueryStore from "../../stores/SearchQueryStore";
import {observer} from "mobx-react";

const Books = observer(() => {
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState()
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('popularity')
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedStars, setSelectedStars] = useState([])

    const [isBooksLoading, setIsBooksLoading] = useState(true)

    const {searchQuery} = searchQueryStore;

    const queryParams = {
        sortOrder: sort,
        searchQuery: searchQuery,
        page: page,
        stars: selectedStars,
        genres: selectedGenres,
        pageSize: 3
    };

    let abortController = new AbortController();
    const signal = abortController.signal;

    const getBooks = async () => {
        try {
            setIsBooksLoading(true)
            const queryStringParams = queryString.stringify(queryParams);
            const result = await axios.get(`${SERVER_URL}Book?${queryStringParams}`, {signal})

            setTotalPages(result.data.totalPages)
            setTotalItems(result.data.totalItems)
            setBooks(result.data.books)
        } catch (e) {
            console.error(e)
        } finally {
            setIsBooksLoading(false)
        }
    }

    const getGenres = async () => {
        try {
            const result = await axios.get(`${SERVER_URL}Genre`)
            setGenres(result.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getBooks()
    }, [page, sort, selectedGenres, selectedStars]);

    useEffect(() => {
        getGenres()
    }, []);

    useEffect(() => {
        const cleanup = () => {
            abortController.abort();
            clearTimeout(searchTimer);
        };

        let searchTimer;

        searchTimer = setTimeout(() => {
            getBooks();
        }, 1100);

        return cleanup;
    }, [searchQuery]);

    return (
        <div style={{display: 'flex', marginTop: "80px"}}>
            <Filters genres={genres} setSelectedGenres={setSelectedGenres} setSelectedStars={setSelectedStars}/>
            <Content books={books} setPage={setPage} page={page} totalPages={totalPages} totalItems={totalItems}
                     setSort={setSort} genres={genres} isBooksLoading={isBooksLoading} selectedGenres={selectedGenres}/>
        </div>
    )
})

export default Books