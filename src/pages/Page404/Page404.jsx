import styles from './Page404.module.scss';
import {colors} from "../../assets/styles/colors";
import {Link} from "react-router-dom";
import OrangeBook from '../../assets/images/orangebook.webp';
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useEffect} from "react";

const Page404 = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    useEffect(() => {
        document.title = "Biblio - Not Found"
    }, []);

    return (
        <div className={styles.container + ' ' + (theme === 'light' ? styles.lighttheme : styles.darktheme)} style={{color: colors.ORANGE}}>
            <div className={styles.title}>biblio</div>
            <div className="flex text-9xl font-bold items-center">
                4
                <img className="w-32 h-28" loading="lazy" alt="Orange 404 Book" src={OrangeBook} />
                4
            </div>
            <div className={styles.text}>
                {t('PageNotFoundText')}
            </div>
            <Link to="/" style={{ backgroundColor: colors.ORANGE }}>{t('BackHome')}</Link>
        </div>
    )
}

export default Page404;