import { colors } from "../../assets/styles/colors";
import BookLogo from "../../assets/images/book-512.png";
import {Link} from "react-router-dom";
import SearchForm from "./SearchForm/SearchForm";
import BurgerMenu from "../../assets/images/burger-bar.png"
import {useTranslation} from "react-i18next";
import ThemeSwitch from "../Misc/ThemeSwitch";
import Cookies from "js-cookie";
import userStore from "../../stores/UserStore";
import {useTheme} from "../../utils/contexts/ThemeProvider";

const Header = ({ styles, isBurgerMenuActive, setIsBurgerMenuActive, location, navigate }) => {
    const { user } = userStore;

    const { i18n, t } = useTranslation();
    const {theme} = useTheme()

    const handleChangeLanguage = (e) => {
        Cookies.set('language', e.target.value, {
            path: '/',
        });

        i18n.changeLanguage(e.target.value);
    };

    return (
        <header className={styles.header_block} style={{ backgroundColor: theme === 'light' ? colors.ORANGE : colors.DARK_ORANGE}}>
            <div className={styles.header_small_container}>
                <img alt='Biblio Logo' src={BookLogo} onClick={() => navigate('/')} />
                <div>Biblio</div>
            </div>

            <SearchForm />

            <div className={styles.links}>
                <Link to='/' className={location.pathname === "/" ? styles.active : ''}>{t('Home')}</Link>
                <Link to='/books' className={location.pathname === "/books" ? styles.active : ''}>{t('Books')}</Link>

                {user &&
                    <>
                        <Link to='/profile' className={location.pathname === "/profile" ? styles.active : ''}>{t('Profile')}</Link>
                        {user.isAdmin && <Link to='/admin/dashboard'>{t('Admin')}</Link>}
                    </>
                }
            </div>

                    <div className={styles.log_in_button}>
                        {/*<Link to="/login">{t('LogIn')}</Link>*/}
                        <div className={styles.burger_menu} onClick={() => setIsBurgerMenuActive(!isBurgerMenuActive)}>
                            <img alt="Burger Menu" src={BurgerMenu} />
                        </div>

                        <div className={isBurgerMenuActive ? styles.menubar : styles.hidden} style={{ backgroundColor: theme === 'light' ? colors.ORANGE : colors.DARK_ORANGE}}>
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
                                    <div className="cursor-pointer" onClick={() => navigate("/books")}>{t('Books')}</div>
                                </div>
                                <div className={styles.line}/>
                                <div>
                                    <div className="cursor-pointer" onClick={() => navigate("/books?sortOrder=popularity")}>{t('PopularWord')}</div>
                                    <div className="cursor-pointer" onClick={() => navigate("/books?sortOrder=rating")}>{t('TrendingWord')}</div>
                                </div>
                            </div>

                            <div className={styles.misc}>
                                <ThemeSwitch/>
                                <select className={styles.languageselect} onChange={handleChangeLanguage}
                                        value={Cookies.get('language') || ''}>
                                    <option value='en'>English</option>
                                    <option value='ru'>Russian</option>
                                    <option value='de'>German</option>
                                    <option value='ua'>Ukrainian</option>
                                    <option value='sp'>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
        </header>
    )
}

export default Header;