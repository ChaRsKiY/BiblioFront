import styles from "./LogRegForm.module.scss"
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import validator from "validator";
import {useState} from "react";
import SubmitButton from "./SubmitButton";

const ForgetPassEmailForm = ({
                                 forgetPass,
                                 resendForgetPass,
                                 serverError,
                                 setServerError,
                                 isEmailVerifying,
                                 setIsEmailVerifying,
                                 serverMessage,
                                 isLoading
                             }) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const [email, setEmail] = useState()

    const [emailError, setEmailError] = useState("")

    const validateForm = () => {
        let formIsValid = true;
        let newEmailError = "";

        if (!validator.isEmail(email)) {
            newEmailError = t('InvalidEmail');
            formIsValid = false;
        }

        setEmailError(newEmailError);
        return formIsValid;
    };


    const handleEmailChanged = (e) => {
        setEmailError("")
        setServerError("")
        setEmail(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            forgetPass(email)
        }
    }

    return (
        <div className={styles.container}
             style={{background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff'}}>
            <div className={styles.heading}>{t('ForgetPass')}</div>

            <form onSubmit={handleFormSubmit} className={styles.form} action="">
                {isEmailVerifying ? (
                    <>
                        <div className={styles.forgetpasstext}>{t('ForgetPassIsVerifyingTipText')}</div>
                        <div className={styles.inputs}>
                            <input
                                placeholder={t('E-mail')}
                                id="email"
                                name="email"
                                type="email"
                                className={styles.input}
                                disabled
                                style={{marginBottom: "20px"}}
                            />
                            <span>{serverError}</span>
                            <div className={styles.servermesssage}>{serverMessage}</div>
                            <div className={styles.isverifyingtip + " " + (isLoading && styles.isloading)}>{t('NotYourEmail')} <span
                                onClick={() => !isLoading && setIsEmailVerifying(false)}>{t('Change')}</span></div>
                            <div className={styles.isverifyingtip + " " + (isLoading && styles.isloading)}>{t('DontSeeTheEmail')} <span
                                onClick={() => !isLoading && resendForgetPass(email)}>{t('ResendIt')}</span></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.forgetpasstext}>{t('ForgetPassTipText')}</div>
                        <div className={styles.inputs}>
                            <input
                                placeholder={t('E-mail')}
                                id="email"
                                name="email"
                                type="email"
                                className={styles.input}
                                onChange={handleEmailChanged}
                            />
                            <span>{emailError}</span>
                            <span>{serverError}</span>
                        </div>
                        <SubmitButton isLoading={isLoading} title={t('SendEmail')} />
                    </>
                )}
            </form>
        </div>
    )
}

export default ForgetPassEmailForm