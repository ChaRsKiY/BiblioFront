import styles from './BooksBlock.module.scss';
import {colors} from "../../../assets/styles/colors";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const BooksBlock = ({ books, title, category }) => {
    const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.title} style={{color: colors.ORANGE}}>{title}</div>
      <div className={styles.books}>
        {books.map((el, index) => (
            <div key={index}>
                <img alt="Book Cover Image" src={require("../../../data/images/" + el.coverImage)} />
                <div>{el.name}</div>
            </div>
        ))}
      </div>
        <Link to={'/' + category} style={{color: colors.GRAY}}>{t('SeeMore')}</Link>
    </div>
  )
}

export default BooksBlock;