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

const Home = ({isBannerVisible, hideBanner}) => {
    const sortedTrendingBooks = books.sort((a, b) => b.rating - a.rating);

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

            <BooksBlock title={t('Trending')} books={sortedTrendingBooks} category="trend"/>
            <BooksBlock title={t('Popular')} books={sortedTrendingBooks} category="popular"/>

            <InfoBlock/>

            <GenresBlock title={t('Genres')} genres={genres}/>
        </div>
    )
}

export default Home;