import BooksBlock from "../components/Home/BooksBlock/BooksBlock";
import Banner from "../components/Home/Banner/Banner";
import {genres} from "../data/genres";
import GenresBlock from "../components/Home/BooksBlock/GenresBlock";
import InfoBlock from "../components/Home/InfoBlock/InfoBlock";
import {useTranslation} from "react-i18next";
import {useTheme} from "../utils/contexts/ThemeProvider";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    const [books, setBooks] = useState({
        trendingBooks: [],
        popularBooks: []
    })

    const getTrendingAndPopularBooks = async () => {
        try {
            const resultPopular = await axios.get(`Book/popular`);
            setBooks((prev) => ({ ...prev, popularBooks: resultPopular.data }));

            const resultTrending = await axios.get(`Book/trending`);
            setBooks((prev) => ({ ...prev, trendingBooks: resultTrending.data }));
        } catch (error) {
            console.error('Error fetching trending and popular books:', error);
        }
    }

    useEffect(() => {
        getTrendingAndPopularBooks()
        document.title = "Biblio - Home"
    }, []);

    const { i18n, t } = useTranslation();

    const { theme } = useTheme();

    return (
        <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            <Banner />

            <BooksBlock title={t('Trending')} books={books.trendingBooks} category="trend" type="popularity" />
            <BooksBlock title={t('Popular')} books={books.popularBooks} category="popular" type="rating" />

            <InfoBlock/>

            <GenresBlock title={t('Genres')} genres={genres}/>
        </div>
    )
}

export default Home;