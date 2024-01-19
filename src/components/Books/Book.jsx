import LazyImage from "./LazyImage";
import {useNavigate} from "react-router-dom";

const Book = ({ book, styles, genres }) => {
    const truncateText = (text, maxWords, maxChars) => {
        // Split the text into words
        const words = text.split(' ');

        // Take the first 'maxWords' words
        const truncatedWords = words.slice(0, maxWords);

        // Join the truncated words into a string
        let truncatedText = truncatedWords.join(' ');

        // If the truncated text is longer than 'maxChars', trim it to 'maxChars'
        if (truncatedText.length > maxChars) {
            truncatedText = truncatedText.substring(0, maxChars);
        }

        return truncatedText;
    }

    const navigate = useNavigate()

  return (
      <div key={book.id} className={styles.bookcontainer} onClick={() => navigate('/books/' + book.id)}>
          <LazyImage src={'https://localhost:7000/Book/bookcover/' + book.coverImage} alt={book.title} />
          <div>
              <div className={styles.booktitle}>{book.title}</div>
              <div className={styles.bookbio}>{truncateText(book.description, 4, 20)}...</div>
              <div className={styles.doublecontainer}>
                  <div>{genres?.find(genre => genre.id === book.genreId)?.title}</div>
                  <div>{book.rating}/10</div>
              </div>
              <div className={styles.bookauthor}>Author: <span>{book.author}</span></div>
          </div>
      </div>
  )
}

export default Book