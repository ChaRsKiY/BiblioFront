import LazyImage from "../Books/LazyImage";

const TopContainer = ({ styles, book }) => {
  return (
      <div className={styles.topcontainer}>
          <div className={styles.left}>
              <div className={styles.title}>{book.title}</div>
              <div className={styles.description}>{book.description}</div>
              <div className={styles.misc}>
                  <div>Author: {book.author}</div>
                  <div>Rating: {book.rating || 0}/10</div>
              </div>
              <div className={styles.year}>Year: {new Date(book.year).getFullYear()}</div>
              <div className={styles.year}>Published: {new Date(book.publicationDate).toLocaleDateString()}</div>
              <div className={styles.counters}>
                  <div>Downloads: {book?.downloadCount || 0}</div>
                  <div>Reads: {book?.readCounter || 0}</div>
              </div>
          </div>
          <div className={styles.right}>
              <LazyImage src={'https://localhost:7000/Book/bookcover/' + book.coverImage} alt={book.title}/>
          </div>
      </div>
  )
}

export default TopContainer