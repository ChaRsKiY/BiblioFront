const NormalMode = ({ styles, userData, handleLogOut, t, setIsUserEditingActive, theme }) => {
  return (
      <>
          <div className={styles.triplecontainer}>
              <div className={styles.doublecontainer}>
                  <img alt="Avatar Image" className={styles.avatar}
                       src={"https://localhost:7000/User/avatar/" + userData.avatar}/>
                  <div className={styles.verticalcontainer}>
                      <div className={styles.username}>{userData.userName}</div>
                      <div
                          className={styles.regdate}>{t('UserSince')}: {new Date(userData.registrationDate).toLocaleDateString()}</div>
                  </div>
              </div>
              <button onClick={handleLogOut} className={styles.conlog + ' ' + (styles.logout)}>
                  <div>
                      <svg viewBox="0 0 512 512">
                          <path
                              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                          </path>
                      </svg>
                  </div>
              </button>
          </div>

          {userData.bio && <div className={styles.bio}>{userData.bio}</div>}

          <div className={styles.orangeline}>{t('Email')}: <span
              style={{color: theme === 'light' ? '#000' : '#fff'}}>{userData.email}</span></div>
          <div className={styles.orangeline}>{t('Name')}: <span
              style={{color: theme === 'light' ? '#000' : '#fff'}}>{userData.name ? userData.name : '-'}</span></div>
          <div className={styles.orangeline}>{t('Surname')}: <span
              style={{color: theme === 'light' ? '#000' : '#fff'}}>{userData.surname ? userData.surname : '-'}</span></div>

          <div className={styles.edit} onClick={() => setIsUserEditingActive(true)}>{t('Edit')}</div>
      </>
  )
}

export default NormalMode