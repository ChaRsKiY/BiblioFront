import {useEffect, useState} from "react";
import Main from "../../components/Profile/Main";
import styles from './Profile.module.scss'
import LibraryImg from '../../assets/images/library.png'
import {colors} from "../../assets/styles/colors";
import tokenStore from "../../stores/TokenStore";
import getProfileData from "../../utils/getProfileData";
import updateUserData from "../../utils/updateUserData";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import axios from "axios";
import {SERVER_URL} from "../../data/urls";

const Profile = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [userData, setUserData] = useState()

    const { token } = tokenStore;

    const fetch = async () => {
        setUserData(await getProfileData(token))
    }

    useEffect(() => {
        fetch()
    }, [])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const { t } = useTranslation();
    const { theme } = useTheme();

    const send5 = async () => {
        try {
            await axios.get(SERVER_URL + "User/email-change-request", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    const send = async () => {
        try {
            await axios.post(SERVER_URL + "User/email-change", { email: "mtovkay@gmail.com", code: "6959ee67" },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    const send7 = async () => {
        try {
            await axios.post(SERVER_URL + "User/email-change-confirm", { email: "mtovkai@gmail.com", code: "5b0724b2" },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

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
                       style={currentPage === 1 ? {color: colors.ORANGE} : {}}>{t('Settings')}
                  </div>
                  <div className={styles.line}/>
                  <div className={styles.title} onClick={() => handlePageChange(2)}
                       style={currentPage === 2 ? {color: colors.ORANGE} : {}}>{t('Friends')}
                  </div>
              </div>
              <div className={styles.innercontainer}>
                  {currentPage === 0 && <Main styles={styles} userData={userData} t={t} theme={theme} fetch={fetch} />}
                  <button onClick={() => send()}>Click!</button>
              </div>
          </div>
      </div>
  )
}

export default Profile;