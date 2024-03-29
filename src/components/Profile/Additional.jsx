import PassIcon from "../../assets/images/padlock.png"
import MailIcon from "../../assets/images/mail.png"
import {useState} from "react";
import axios from "axios";
import tokenStore from "../../stores/TokenStore";
import Loader from "../Misc/Loader";
import {useTranslation} from "react-i18next";
import {FaBackspace} from "react-icons/fa";
import ProfileChangeEmailModal from "./ChangeEmailModal";

const Additional = ({ styles }) => {
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)
    const [isEmailChanging, setIsEmailChanging] = useState(false)
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

    const handleCloseSetPass = () => {
        setNewPassword("")
        setOldPassword("")
        setErrors({})
        setIsPasswordChanging(false)
    }

    const handleChangeEmail = async (data) => {

    }
    
    const handlePasswordChange = async () => {
        if(validateForm()) {
            try {
                setIsLoading(true)

                await axios.put("User/update-password", { oldPassword: oldPassword, newPassword: newPassword }, {
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
                              <FaBackspace size={18} className="cursor-pointer dark:text-white" onClick={handleCloseSetPass} />
                              <div className="flex-col">
                                  <input onChange={handleOldPasswordChange} autoComplete="off" name="OldPass" id="OldPass"
                                         placeholder="Old password"
                                         className="border border-neutral-300 rounded px-2 py-1 outline-neutral-800 dark:bg-neutral-600 dark:text-white"
                                         type="password"/>
                                  <div></div>
                                  {errors?.oldPassword && <span>{errors.oldPassword}</span>}
                                  {serverError === "invalidOldPassword" && <span>Invalid Password</span>}
                              </div>
                              <div className="">
                                  <input onChange={handleNewPasswordChange} autoComplete="off" name="NewPass" id="NewPass"
                                         placeholder="New password"
                                         className="border border-neutral-300 rounded px-2 py-1 outline-neutral-800 dark:bg-neutral-600 dark:text-white"
                                         type="text"/>
                                  <div></div>
                                  {errors?.newPassword && <span>{errors.newPassword}</span>}
                              </div>

                              <button
                                  className="bg-orange-300 rounded text-white px-2 py-1.5 dark:bg-orange-400 hover:bg-orange-400 dark:hover:bg-orange-500"
                                  onClick={() => handlePasswordChange()}>Change</button>
                          </>
                      ) : (
                          <Loader />
                      )
                  ) : (
                      <>
                          <div onClick={() => setIsPasswordChanging(true)}>
                              <img alt="Change Icon" src={PassIcon}/>
                              <div>{t('ChangePassword')}</div>
                          </div>
                          <div onClick={() => setIsEmailChanging(true)}>
                              <img alt="Change Icon" src={MailIcon}/>
                              <div>{t('ChangeEmail')}</div>
                          </div>
                          {isEmailChanging && <ProfileChangeEmailModal open={isEmailChanging} setOpen={setIsEmailChanging} onConfirm={handleChangeEmail} />}
                      </>
                  )
              }
          </div>
      </>
  )
}

export default Additional