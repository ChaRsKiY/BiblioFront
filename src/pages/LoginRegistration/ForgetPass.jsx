import {useLocation} from "react-router-dom";
import ForgetPassEmailForm from "../../components/Misc/ForgetPassEmailForm";
import styles from "./LogReg.module.scss";
import BackImage from "../../assets/images/back.png";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useEffect, useState} from "react";
import ForgetPassPassChange from "../../components/Misc/ForgetPassPassChange";

const ForgetPass = ({navigate}) => {
    const location = useLocation();

    const {theme} = useTheme();
    const {t} = useTranslation();

    const [serverError, setServerError] = useState()
    const [serverMessage, setServerMessage] = useState()
    const [isEmailVerifying, setIsEmailVerifying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        document.title = "Biblio - Forget Pass"
    }, []);

    const changePassword = async (token, email, password) => {
        try {
            setIsLoading(true)
            await axios.post("User/reset-password", { Token: token, Password: password, Email: email })
            setServerMessage("success")
        } catch (e) {
            setServerError("Error")
        } finally {
            setIsLoading(false)
        }
    }

    const forgetPass = async (email) => {
        try {
            setIsLoading(true)
            await axios.post("User/password-reset-request", {Email: email})
            setIsEmailVerifying(true)
        } catch (e) {
            if (e.response.status === 400) {
                if (e.response.data === "userExist") {
                    setServerError(t('InvalidEmailUserExist'))
                }
            } else if (e.response.status === 429) {
                setServerError(t('TooManyRequestsTryInThreeMinutes'))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const resendForgetPass = async (email) => {
        try {
            setIsLoading(true)
            setServerError("")
            setServerMessage("")
            await axios.post("User/password-reset-request", {Email: email})
            setServerMessage(t('EmailHasBeenSent'))
        } catch (e) {
            if (e.response.status === 400) {
                if (e.response.data === "userExist") {
                    setServerError(t('InvalidEmailUserExist'))
                }
            } else if (e.response.status === 429) {
                setServerError(t('TooManyRequestsTryInThreeMinutes'))
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container + ' ' + (theme === 'light' ? styles.lighttheme : styles.darktheme)}>
            <div className={styles.title}>Biblio</div>
            <img onClick={() => navigate("/")} alt="Back Image" src={BackImage}/>
            {location.pathname === "/forgetpass" &&
                <ForgetPassEmailForm forgetPass={forgetPass} resendForgetPass={resendForgetPass}
                                     serverError={serverError} setServerError={setServerError}
                                     isEmailVerifying={isEmailVerifying} setIsEmailVerifying={setIsEmailVerifying}
                                     serverMessage={serverMessage} isLoading={isLoading}/>}

            {location.pathname === "/forgetpass/change" && <ForgetPassPassChange isLoading={isLoading} serverError={serverError} changePassword={changePassword} serverMessage={serverMessage} />}
        </div>
    )
}

export default ForgetPass