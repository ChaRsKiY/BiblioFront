import styles from './Banner.module.scss'
import {useTranslation} from "react-i18next";

const Banner = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}
             style={{backgroundImage: `url(${require("../../../assets/images/books_background.png")})`}}
        >
            <div className={styles.overlay}></div>
            <div className={styles.text}>
                {t('BannerTitle')}
                <div>
                    {t('BannerText')}
                </div>
            </div>
        </div>
    )
}

export default Banner;