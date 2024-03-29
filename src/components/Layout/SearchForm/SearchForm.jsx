import styles from './SearchForm.module.scss';
import {useTranslation} from "react-i18next";
import searchQueryStore from "../../../stores/SearchQueryStore";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Loader from "../../Misc/Loader";
import LazyImage from "../../Books/LazyImage";

const SearchForm = () => {
    const { t } = useTranslation();
    const [isSmartSearching, setIsSmartSearching] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSmartLoading, setIsSmartLoading] = useState(false)
    const [smartBooks, setSmartBooks] = useState([])

    const inputref = useRef()

    const location = useLocation()
    const navigate = useNavigate()

    const getBooksSmart = async () => {
        try {
            setIsSmartLoading(true)
            const result = await axios.get(`Book?searchQuery=${searchQuery}`)
            setSmartBooks(result.data.books)
            console.log(result.data.books)
        } catch (e) {
            
        } finally {
            setIsSmartLoading(false)
        }
    }

    useEffect(() => {
        if (location.pathname === "/books") {
            searchQueryStore.setSearchQuery(searchQuery)
        } else if (searchQuery) {
            getBooksSmart()
            setIsSmartSearching(true)
        } else {
            setIsSmartSearching(false)
        }
    }, [searchQuery]);

    useEffect(() => {
        setSearchQuery("")
        setSmartBooks([])
        setIsSmartSearching(false)
        inputref.current.value = ""
    }, [location.pathname])

    const handleSearchChanged = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <>
        <div className={styles.search}>
            <input ref={inputref} type="text" className={styles.search__input} placeholder={t('Search')} onChange={handleSearchChanged} />
                <button className={styles.search__button}>
                    <svg className={styles.search__icon} aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                </button>
        </div>
        {isSmartSearching && <div className={styles.smartsearch}>
            {!isSmartLoading ? smartBooks.length ? smartBooks.map((el, index) => (
                <div key={index} onClick={() => navigate("/books/" + el.id)}>
                    <LazyImage src={'https://localhost:7000/Book/bookcover/' + el.coverImage} alt={el.title} height="40px" width="30px" />
                    <div>{el.title}</div>
                </div>
            )) : <div className={styles.nothingfound}>{t('NothingFound')}</div> : <Loader />}
        </div>}
        </>

    )
}

export default SearchForm;