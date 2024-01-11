import PassIcon from "../../assets/images/padlock.png"
import MailIcon from "../../assets/images/mail.png"
import {useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/urls";
import tokenStore from "../../stores/TokenStore";

const Additional = ({ styles }) => {
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const { token } = tokenStore;

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value)
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }
    
    const handlePasswordChange = async () => {
        try {
            console.log(oldPassword, newPassword)
            await axios.put(SERVER_URL + "User/update-password", { oldPassword: oldPassword, newPassword: newPassword }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setIsPasswordChanging(false)
        } catch (e) {
            console.error(e)
        }
    }

  return (
      <>
          <div className={styles.changecontainer}>
              {
                  isPasswordChanging ? (
                      <>
                          <div className={styles.inputgroup}>
                              <label className={styles.inputlabel}>Old password</label>
                              <input onChange={handleOldPasswordChange} autoComplete="off" name="OldPass" id="OldPass" className={styles.inputpass}
                                     type="password"/>
                              <div></div>
                          </div>
                          <div className={styles.inputgroup}>
                              <label className={styles.inputlabel}>New password</label>
                              <input onChange={handleNewPasswordChange} autoComplete="off" name="NewPass" id="NewPass" className={styles.inputpass}
                                     type="text"/>
                              <div></div>
                          </div>

                          <button onClick={() => handlePasswordChange()}>Confirm!</button>
                      </>
                  ) : (
                      <>
                          <div onClick={() => setIsPasswordChanging(true)}>
                              <img alt="Change Icon" src={PassIcon}/>
                              <div>Change Password</div>
                          </div>
                          <div>
                          <img alt="Change Icon" src={MailIcon}/>
                              <div>Change Email</div>
                          </div>
                      </>
                  )
              }
          </div>
      </>
  )
}

export default Additional