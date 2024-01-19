import styles from './Content.module.scss'
import Book from "./Book";
import Loader from "../Misc/Loader";
import ArrowImg from '../../assets/images/pagearrow.png'
import {AspectRatio, Card, Skeleton, Typography} from "@mui/joy";

const Content = ({ books, page, setPage, totalPages, totalItems, setSort, genres, isBooksLoading, selectedGenres }) => {
    const handleSortChanged = (e) => {
        setSort(e.target.value)
    }

    const genresToText = () => {
        const truncate = () => {
            const selectedGenresTitles = selectedGenres.map(genreId => {
                const genre = genres.find(g => g.id === parseInt(genreId, 10));
                return genre ? genre.title : '';
            });

            const formattedGenres = selectedGenresTitles.filter(Boolean);

            if (formattedGenres.length === 1) {
                return formattedGenres[0];
            } else if (formattedGenres.length > 1) {
                const maxDisplayedGenres = 5;
                const displayedGenres = formattedGenres.slice(0, maxDisplayedGenres);
                const remainingGenresCount = formattedGenres.length - maxDisplayedGenres;

                if (remainingGenresCount > 0) {
                    return `${displayedGenres.join(', ')} and ${remainingGenresCount} more`;
                } else {
                    const lastGenre = displayedGenres.pop();
                    const joinedGenres = displayedGenres.join(', ');
                    return `${joinedGenres} and ${lastGenre}`;
                }
            } else {
                return "All genres";
            }
        }

        return truncate() + '.'
    }

    const components = [1,2,3,4,5,6,7,8]

  return (
      <div className={styles.container}>
          <div className={styles.topcontainer}>
              <div className={styles.title}>{genresToText()}</div>
              <div className={styles.sortby}>Sort by:
                  <select onChange={handleSortChanged} defaultValue="popularity">
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="popularity">Popularity</option>
                      <option value="rating">Rating</option>
                  </select>
              </div>
          </div>
          <div className={styles.booksfound}>Books found - <span>{totalItems}</span></div>

          {
               !isBooksLoading ? (
                   <>
                   {books.length ? (
                       <>
                           <div className={styles.books}>
                               {books.map(el => (
                                   <Book book={el} styles={styles} genres={genres} />
                               ))}
                           </div>

                           <div className={styles.bottomcontainer}>
                               <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}><img className={styles.left} alt="Arrow" src={ArrowImg} /></button>
                               <div className={styles.page}>{page}</div>
                               <button disabled={page === totalPages}
                                       onClick={() => setPage(prev => prev + 1)}><img alt="Arrow" src={ArrowImg}/>
                               </button>
                           </div>
                       </>
                   ) : (
                       <div className={styles.nothingfound}>Nothing found</div>
                   )
                   }</>
               ) : (
                   <div className={styles.books}>
                       {components.map((el) => (
                               <Card variant="outlined" sx={{ display: 'flex', margin: '20px 0', gap: 2, border: 0 }} key={el}>
                                   <AspectRatio ratio="21/9" sx={{ zIndex: 0 }}>
                                       <Skeleton variant="overlay">
                                           <img
                                               alt=""
                                               src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                                           />
                                       </Skeleton>
                                   </AspectRatio>
                                   <Typography>
                                       <Skeleton>
                                           Lorem ipsum is placeholder
                                       </Skeleton>
                                   </Typography>
                                   <Typography>
                                       <Skeleton>
                                           Lorem
                                       </Skeleton>
                                   </Typography>
                               </Card>
                           ))}
                   </div>
               )
          }
      </div>
  )
}

export default Content