import { colors } from "../../assets/styles/colors";
import BookLogo from "../../assets/images/book-512.png";
import {Link, useLocation} from "react-router-dom";
import SearchForm from "./SearchForm/SearchForm";
import BurgerMenu from "../../assets/images/burger-bar.png"
import {useTranslation} from "react-i18next";
import ThemeSwitch from "../Misc/ThemeSwitch";
import Cookies from "js-cookie";
import userStore from "../../stores/UserStore";

const Header = ({ styles, isBurgerMenuActive, setIsBurgerMenuActive, location, navigate }) => {
    const { user } = userStore;

    const { i18n, t } = useTranslation();

    const handleChangeLanguage = (e) => {
        Cookies.set('language', e.target.value, {
            path: '/',
        });

        i18n.changeLanguage(e.target.value);
    };

    return (
        <header className={styles.header_block} style={{ backgroundColor: colors.ORANGE }}>
            <div className={styles.header_small_container}>
                <img alt='Biblio Logo' src={BookLogo} onClick={() => navigate('/')} />
                <div>Biblio</div>
            </div>

            <SearchForm />

            <div className={styles.links}>
                <Link to='/' className={location.pathname === "/" ? styles.active : ''}>{t('Home')}</Link>
                <Link to='/books' className={location.pathname === "/books" ? styles.active : ''}>{t('Books')}</Link>

                {user &&
                    <Link to='/profile' className={location.pathname === "/profile" ? styles.active : ''}>{t('Profile')}</Link>
                }
            </div>

                    <div className={styles.log_in_button}>
                        {/*<Link to="/login">{t('LogIn')}</Link>*/}
                        <div className={styles.burger_menu} onClick={() => setIsBurgerMenuActive(!isBurgerMenuActive)}>
                            <img alt="Burger Menu" src={BurgerMenu} />
                        </div>

                        <div className={isBurgerMenuActive ? styles.menubar : styles.hidden}>
                            <div className={styles.misc}>
                                {
                                    user ? (
                                        <Link to="/profile">{user.userName}</Link>
                                    ) : (
                                        <>
                                            <Link to='/login'>{t('LogIn')}</Link>
                                            <Link to='/register'>{t('Register')}</Link>
                                        </>
                                    )
                                }
                            </div>

                            <div className={styles.misc}>
                                <div>
                                    <div>{t('Books')}</div>
                                    <div>{t('Genres')}</div>
                                    <div>{t('Authors')}</div>
                                </div>
                                <div className={styles.line}/>
                                <div>
                                    <div>{t('PopularWord')}</div>
                                    <div>{t('TrendingWord')}</div>
                                </div>
                            </div>

                            <div className={styles.misc}>
                                <ThemeSwitch/>
                                <select className={styles.languageselect} onChange={handleChangeLanguage} value={Cookies.get('language') || ''}>
                                    <option value='en'>English</option>
                                    <option value='ru'>Russian</option>
                                    <option value='de'>German</option>
                                </select>
                            </div>
                        </div>
                    </div>
        </header>
    )
}

export default Header;