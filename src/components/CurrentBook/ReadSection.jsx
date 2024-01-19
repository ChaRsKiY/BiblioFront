import ArrowImg from "../../assets/images/pagearrow.png";

const ReadSection = ({ styles, content, page, setPage, totalPages }) => {
  return (
      <div className={styles.readcontainer}>
          <div className={styles.pagenum}>
              Page: {page}
          </div>

          <div>
              {content && content.map((el, key) => (
                  <p key={key}>{el}</p>
              ))}
          </div>

          <div className={styles.bottomcontainer}>
              <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}><img className={styles.left}
                                                                                           alt="Arrow" src={ArrowImg}/>
              </button>
              <button disabled={page === totalPages}
                      onClick={() => setPage(prev => prev + 1)}><img alt="Arrow" src={ArrowImg}/>
              </button>
          </div>
      </div>
  )
}

export default ReadSection