import {useEffect, useState} from "react";
import Main from "../../components/Profile/Main";
import styles from './Profile.module.scss'
import LibraryImg from '../../assets/images/library.png'
import {colors} from "../../assets/styles/colors";
import tokenStore from "../../stores/TokenStore";
import getProfileData from "../../utils/getProfileData";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import axios from "axios";
import ProfileBooks from "../../components/Profile/ProfileBooks";

const Profile = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [userData, setUserData] = useState()

    const { token } = tokenStore;

    const fetch = async () => {
        setUserData(await getProfileData(token))
    }

    useEffect(() => {
        document.title = "Biblio - Profile"
        fetch()
    }, [])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const { t } = useTranslation();
    const { theme } = useTheme();

  return (
      <div className={styles.container} style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
          <div className={styles.background} style={{backgroundImage: `url(${LibraryImg})`}} />
          <div className={styles.block} style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
              <div className={styles.menu_block}>
                  <div className={styles.title} onClick={() => handlePageChange(0)}
                       style={currentPage === 0 ? {color: colors.ORANGE} : {}}>{t('Profile')}
                  </div>
                  <div className={styles.line}/>
                  <div className={styles.title} onClick={() => handlePageChange(1)}
                       style={currentPage === 1 ? {color: colors.ORANGE} : {}}>{t('Books')}
                  </div>
              </div>
              <div className={styles.innercontainer}>
                  {currentPage === 0 && <Main styles={styles} userData={userData} t={t} theme={theme} fetch={fetch} />}
                  {currentPage === 1 && <ProfileBooks />}
              </div>
          </div>
      </div>
  )
}

export default Profile;