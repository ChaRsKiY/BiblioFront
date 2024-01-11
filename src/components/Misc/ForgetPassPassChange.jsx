import styles from "./LogRegForm.module.scss";
import SubmitButton from "./SubmitButton";
import {useState} from "react";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const ForgetPassPassChange = ({isLoading, serverError, changePassword, serverMessage}) => {
    const url = new URL(window.location.href);

    const email = url.searchParams.get('email');
    const token = url.searchParams.get('verificationToken');

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const validateForm = () => {
        let formIsValid = true;
        let newError = "";

        if (password.length < 6) {
            newError = t('PasswordBetweenCharacters');
            formIsValid = false;
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
            newError = t('PasswordContainsDigits');
            formIsValid = false;
        }

        setPasswordError(newError);
        return formIsValid;
    };

    const handlePasswordChanged = (e) => {
        setPasswordError("")
        setPassword(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            changePassword(token, email, password)
        }
    }

    const {theme} = useTheme()
    const {t} = useTranslation()
    const navigate = useNavigate()

    return (
        <div className={styles.container}
             style={{background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff'}}>
            <div className={styles.heading}>{t('ChangePass')}</div>
            {serverError ? (
                <div className={styles.criticalerror}>{t('PassResetTimeExpired')}</div>
            ) : (
                serverMessage ? (
                    <div className={styles.success}>
                        {t('SuccessResetPass')}
                        <div onClick={() => navigate('/login')}>{t('SignIn')}</div>
                    </div>
                ) : (
                    <form onSubmit={handleFormSubmit} className={styles.form} action="">
                        <div className={styles.inputs}>
                            <input
                                placeholder={t('Password')}
                                id="password"
                                name="password"
                                type="password"
                                className={styles.input}
                                onChange={handlePasswordChanged}
                            />
                            <span>{passwordError}</span>
                        </div>
                        <SubmitButton isLoading={isLoading} title={t('ChangePass')}/>
                    </form>
                )
            )}
        </div>
    )
}

export default ForgetPassPassChange