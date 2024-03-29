import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./EmailConfirmation.module.scss"
import Loader from "../components/Misc/Loader";
import {useTheme} from "../utils/contexts/ThemeProvider";
import {useTranslation} from "react-i18next";

const EmailConfirmation = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [text, setText] = useState("")

    const fetch = async (email, verificationCode) => {
        try {
            const response = await axios.post("User/verifyemail", { Email: email, VerificationCode: verificationCode })

            if (response.status === 200) {
                setText(t('YourAccountIsSuccesfullyVerified'))
            }
        } catch (e) {
            if (e.response.status === 400) {
                if(e.response.data === "invalidVerificationCode") {
                    setText(t('YourVerificationCodeIsInvalid'))
                } else if(e.response.data === "alreadyVerified") {
                    setText(t('YourAccountIsAlreadyVerified'))
                } else if(e.response.data === "userExist") {
                    setText(t('UserExistTryToRegister'))
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        document.title = "Biblio - Email Confirmation"
        const url = new URL(window.location.href);

        const email = url.searchParams.get('email');
        const verificationCode = url.searchParams.get('verificationCode');

        fetch(email, verificationCode)
    }, []);

    const { t } = useTranslation()
    const { theme } = useTheme()

    return (
        <div className={styles.container} style={{background: theme === 'light' ? '#fff' : '#333'}}>
            <div className={styles.block}>
                {isLoading ? <Loader/> : (
                    <div className={styles.text} style={{color: theme === 'light' ? '#000' : '#fff'}}>
                        {text}
                    </div>
                )}
            </div>
            <div className={styles.needhelp}>{t('NeedHelpWriteUs')}</div>
        </div>
    )
}

export default EmailConfirmation