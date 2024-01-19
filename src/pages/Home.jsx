import {books} from "../data/books";
import BooksBlock from "../components/Home/BooksBlock/BooksBlock";
import Banner from "../components/Home/Banner/Banner";
import {genres} from "../data/genres";
import GenresBlock from "../components/Home/BooksBlock/GenresBlock";
import InfoBlock from "../components/Home/InfoBlock/InfoBlock";
import {useTranslation} from "react-i18next";
import CloseIcon from '../assets/images/close.png'
import {Link} from "react-router-dom";
import {useTheme} from "../utils/contexts/ThemeProvider";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../data/urls";

const Home = ({isBannerVisible, hideBanner}) => {
    const [books, setBooks] = useState({
        trendingBooks: [],
        popularBooks: []
    })

    const getTrendingAndPopularBooks = async () => {
        try {
            const resultPopular = await axios.get(`${SERVER_URL}Book/popular`);
            setBooks((prev) => ({ ...prev, popularBooks: resultPopular.data }));

            const resultTrending = await axios.get(`${SERVER_URL}Book/trending`);
            setBooks((prev) => ({ ...prev, trendingBooks: resultTrending.data }));
        } catch (error) {
            console.error('Error fetching trending and popular books:', error);
        }
    }

    useEffect(() => {
        getTrendingAndPopularBooks()
    }, []);

    const { i18n, t } = useTranslation();

    const { theme } = useTheme();

    return (
        <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            {isBannerVisible && (
                <div className='home-banner'>
                    <p>{t('HomeBannerText')}</p>
                    <div>
                        <Link to="/register">{t('SignUp')}</Link>
                        <Link to="/login">{t('SignIn')}</Link>

                        <img alt="Close" src={CloseIcon} onClick={hideBanner}></img>
                    </div>
                </div>
            )}

            <Banner/>

            <BooksBlock title={t('Trending')} books={books.trendingBooks} category="trend" />
            <BooksBlock title={t('Popular')} books={books.popularBooks} category="popular" />

            <InfoBlock/>

            <GenresBlock title={t('Genres')} genres={genres}/>
        </div>
    )
}

export default Home;