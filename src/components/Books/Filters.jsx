import styles from './Filters.module.scss'
import Genres from "./Genres";
import Rating from "./Rating";

const Filters = ({ genres, setSelectedGenres, setSelectedStars }) => {
  return (
      <div className={styles.container}>
          <div className={styles.title}>Filters</div>

          <Genres styles={styles} genres={genres} setSelectedGenres={setSelectedGenres} />
          <Rating styles={styles} setSelectedStars={setSelectedStars} />
      </div>
  )
}

export default Filters