import styles from "./Loader.module.scss";

const Loader = () => {
  return (
      <div className={styles.mainload}>
          <div className={styles.threebody}>
              <div className={styles.threebodydot}></div>
              <div className={styles.threebodydot}></div>
              <div className={styles.threebodydot}></div>
          </div>
      </div>
  )
}

export default Loader