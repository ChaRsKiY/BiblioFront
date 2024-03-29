import Filters from "../../components/Books/Filters";
import Content from "../../components/Books/Content";
import {useEffect, useState} from "react";
import axios from "axios";
import queryString from "query-string";
import searchQueryStore from "../../stores/SearchQueryStore";
import {observer} from "mobx-react";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useSearchParams} from "react-router-dom";
import styles from './Books.module.scss'

const Books = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortOrder = searchParams.get('sortOrder');
    const queryGenres = searchParams.get('genres');

    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState(sortOrder || 'popularity')
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState(queryGenres ? [queryGenres] : [])
    const [selectedStars, setSelectedStars] = useState([])

    const [isBooksLoading, setIsBooksLoading] = useState(true)

    const {searchQuery} = searchQueryStore;

    const queryParams = {
        sortOrder: sort,
        searchQuery: searchQuery,
        page: page,
        stars: selectedStars,
        genres: selectedGenres,
        pageSize: 10
    };

    let abortController = new AbortController();
    const signal = abortController.signal;

    const getBooks = async () => {
        try {
            setIsBooksLoading(true)
            const queryStringParams = queryString.stringify(queryParams);
            const result = await axios.get(`Book?${queryStringParams}`, {signal})

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
            const result = await axios.get(`Genre`)
            setGenres(result.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        document.title = "Biblio - Books"
        getGenres()
    }, []);

    let searchTimer;

    const fetchData = () => {
        getBooks();
    };

    const cleanup = () => {
        abortController.abort();
        clearTimeout(searchTimer);
    };

    useEffect(() => {
        const fetchDataWithTimer = () => {
            clearTimeout(searchTimer);  // Очищаем таймер перед установкой нового
            searchTimer = setTimeout(() => {
                fetchData();
            }, 700);  // Уменьшаем задержку до 500 миллисекунд
        };

        fetchDataWithTimer();

        return cleanup;
    }, [searchQuery, page, sort, selectedGenres, selectedStars]);

    const { theme } = useTheme()

    return (
        <div style={{ backgroundColor: theme === 'light' ? 'white' : '#333', color: theme === 'light' ? '#000' : '#fff' }} className={styles.maincontainer}>
            <Filters genres={genres} setSelectedGenres={setSelectedGenres} setSelectedStars={setSelectedStars} queryGenres={queryGenres} />
            <Content books={books} setPage={setPage} page={page} totalPages={totalPages} totalItems={totalItems}
                     setSort={setSort} genres={genres} isBooksLoading={isBooksLoading} selectedGenres={selectedGenres} sort={sort} />
        </div>
    )
})

export default Books