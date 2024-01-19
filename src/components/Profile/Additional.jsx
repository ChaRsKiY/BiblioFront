import PassIcon from "../../assets/images/padlock.png"
import MailIcon from "../../assets/images/mail.png"
import {useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/urls";
import tokenStore from "../../stores/TokenStore";
import {Button} from "@mui/joy";
import Loader from "../Misc/Loader";
import validator from "validator";
import {useTranslation} from "react-i18next";

const Additional = ({ styles }) => {
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [serverError, setServerError] = useState("")
    const [errors, setErrors] = useState()

    const { token } = tokenStore;

    const { t } = useTranslation()

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (oldPassword.length < 6) {
            newErrors.oldPassword = t('PasswordBetweenCharacters');
            formIsValid = false;
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(oldPassword)) {
            newErrors.oldPassword = t('PasswordContainsDigits');
            formIsValid = false;
        }

        if (newPassword.length < 6) {
            newErrors.newPassword = t('PasswordBetweenCharacters');
            formIsValid = false;
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(newPassword)) {
            newErrors.newPassword = t('PasswordContainsDigits');
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleOldPasswordChange = (e) => {
        setServerError("")
        setOldPassword(e.target.value)
        setErrors({})
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
        setErrors({})
    }
    
    const handlePasswordChange = async () => {
        if(validateForm()) {
            try {
                setIsLoading(true)

                await axios.put(SERVER_URL + "User/update-password", { oldPassword: oldPassword, newPassword: newPassword }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                setIsPasswordChanging(false)
            } catch (e) {
                if(e.response.status === 400) {
                    if (e.response.data === "invalidOldPassword") {
                        setServerError(e.response.data)
                    }
                }
            } finally {
                setIsLoading(false)
            }
        }
    }

  return (
      <>
          <div className={styles.changecontainer}>
              {
                  isPasswordChanging ? (
                      !isLoading ? (
                          <>
                              <div className={styles.inputgroup}>
                                  <label className={styles.inputlabel}>Old password</label>
                                  <input onChange={handleOldPasswordChange} autoComplete="off" name="OldPass" id="OldPass" className={styles.inputpass}
                                         type="password"/>
                                  <div></div>
                                  {errors?.oldPassword && <span>{errors.oldPassword}</span>}
                                  {serverError === "invalidOldPassword" && <span>Invalid Password</span>}
                              </div>
                              <div className={styles.inputgroup}>
                                  <label className={styles.inputlabel}>New password</label>
                                  <input onChange={handleNewPasswordChange} autoComplete="off" name="NewPass" id="NewPass" className={styles.inputpass}
                                         type="text"/>
                                  <div></div>
                                  {errors?.newPassword && <span>{errors.newPassword}</span>}
                              </div>

                              <Button variant='soft' color="success" onClick={() => handlePasswordChange()}>Change</Button>
                          </>
                      ) : (
                          <Loader />
                      )
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