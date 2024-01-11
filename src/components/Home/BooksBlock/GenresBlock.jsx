import styles from './BooksBlock.module.scss';
import {colors} from "../../../assets/styles/colors";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const GenresBlock = ({ genres, title }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container} style={{paddingBottom: '50px'}}>
            <div className={styles.title} style={{color: colors.ORANGE}}>{title}</div>
            <div className={styles.genres}>
                {genres.slice(4, 8).map((el, index) => (
                    <div key={index} style={{backgroundImage: `url(${require(`../../../assets/images/genres/genre_${(index + 1)}.jpg`)})`}}>
                        <div>{el.title}</div>
                    </div>
                ))}
            </div>
            <div className={styles.genres}>
                {genres.slice(0, 4).map((el, index) => (
                    <div key={index} style={{backgroundImage: `url(${require(`../../../assets/images/genres/genre_${(index + 5)}.jpg`)})`}}>
                        <div>{el.title}</div>
                    </div>
                ))}
            </div>
            <Link to='/genres' className={styles.seemore} style={{color: colors.GRAY}}>{t('SeeMore')}</Link>
        </div>
    )
}

export default GenresBlock;