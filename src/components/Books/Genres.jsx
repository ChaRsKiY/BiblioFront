import Loader from "../Misc/Loader";
import {useTranslation} from "react-i18next";

const Genres = ({ styles, genres, setSelectedGenres, queryGenres }) => {
    const handleGenreChanged = (e) => {
        setSelectedGenres(prev => {
            if (prev.includes(e.target.name)) {
                return prev.filter(genreId => genreId !== e.target.name);
            } else {
                return [...prev, e.target.name];
            }
        });
    }

    const { t } = useTranslation()

  return (
          <>{
              genres ? (
                  <div className={styles.addcontainer}>
                      <div className={styles.title}>{t('Genres')}</div>

                      {genres.map(el => (
                          <div className={styles.content} key={el.id}>
                              <label className={styles.checkBox}>
                                  <input name={el.id} type="checkbox" defaultChecked={el.id.toString() === queryGenres} onChange={handleGenreChanged} />
                                  <div className={styles.transition}></div>
                              </label>
                              <div className={styles.text}>{el.title}</div>
                          </div>
                      ))}

                  </div>
              ) : (
                  <Loader />
              )
          }</>
  )
}

export default Genres