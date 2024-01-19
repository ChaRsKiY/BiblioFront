import Loader from "../Misc/Loader";

const Genres = ({ styles, genres, setSelectedGenres }) => {
    const handleGenreChanged = (e) => {
        setSelectedGenres(prev => {
            if (prev.includes(e.target.name)) {
                return prev.filter(genreId => genreId !== e.target.name);
            } else {
                return [...prev, e.target.name];
            }
        });
    }

  return (
          <>{
              genres ? (
                  <div className={styles.addcontainer}>
                      <div className={styles.title}>Genres</div>

                      {genres.map(el => (
                          <div className={styles.content} key={el.id}>
                              <label className={styles.checkBox}>
                                  <input name={el.id} type="checkbox" onChange={handleGenreChanged} />
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