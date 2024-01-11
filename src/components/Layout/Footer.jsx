import {colors} from "../../assets/styles/colors";
import BookLogo from "../../assets/images/book-512.png";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = ({ styles }) => {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer} style={{ backgroundColor: colors.ORANGE, color: colors.LIGHT_GRAY }}>
            <div className={styles.small_container}>
                <img alt="Biblio Logo" src={BookLogo} />
                <div>© 2023. {t('RightsReserved')}.</div>
            </div>

            <div className={styles.terms}>
                <Link to="/terms">{t('Terms')} </Link>
                -
                <Link to="/privacy"> {t('Privacy')}</Link>
            </div>
        </footer>
    )
}

export default Footer;