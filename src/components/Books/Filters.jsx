import styles from './Filters.module.scss'
import Genres from "./Genres";
import Rating from "./Rating";
import {useTranslation} from "react-i18next";

const Filters = ({ genres, setSelectedGenres, setSelectedStars, queryGenres }) => {
    const { t } = useTranslation()

  return (
      <div className={styles.container}>
          <div className={styles.title}>{t('Filters')}</div>

          <Genres styles={styles} genres={genres} setSelectedGenres={setSelectedGenres} queryGenres={queryGenres} />
          <Rating styles={styles} setSelectedStars={setSelectedStars} />
      </div>
  )
}

export default Filters