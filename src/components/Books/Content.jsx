import styles from './Content.module.scss'
import Book from "./Book";
import ArrowImg from '../../assets/images/pagearrow.png'
import {AspectRatio, Card, Skeleton, Typography} from "@mui/joy";
import {useTranslation} from "react-i18next";

const Content = ({ books, page, setPage, totalPages, totalItems, setSort, genres, isBooksLoading, selectedGenres, sort }) => {
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
                    return `${displayedGenres.join(', ')} ${t('And')} ${remainingGenresCount} ${t('More')}`;
                } else {
                    const lastGenre = displayedGenres.pop();
                    const joinedGenres = displayedGenres.join(', ');
                    return `${joinedGenres} ${t('And')} ${lastGenre}`;
                }
            } else {
                return t("AllGenres");
            }
        }

        return truncate() + '.'
    }

    const components = [1,2,3,4,5,6,7,8]

    const { t } = useTranslation()

  return (
      <div className={styles.container}>
          <div className={styles.topcontainer}>
              <div className={styles.title}>{genresToText()}</div>
              <div className={styles.sortby}>{t('SortBy')}:
                  <select onChange={handleSortChanged} defaultValue={sort}>
                      <option value="title">{t('Title')}</option>
                      <option value="author">{t('Author')}</option>
                      <option value="popularity">{t('Popularity')}</option>
                      <option value="rating">{t('Rating')}</option>
                  </select>
              </div>
          </div>
          <div className={styles.booksfound}>{t('BooksFound')} - <span>{totalItems}</span></div>

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
                       <div className={styles.nothingfound}>{t('NothingFound')}</div>
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