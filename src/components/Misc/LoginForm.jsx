import styles from './LogRegForm.module.scss';
import {Link} from "react-router-dom";
import {useState} from "react";
import validator from 'validator';
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import Loader from "./Loader";
import EmailVerification from "./EmailVerification";

const LoginForm = ({login, isLoading, serverError, setServerError}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isEmailConfirming, setIsEmailConfirming] = useState(false)

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
        setServerError({})
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!validator.isEmail(formData.email)) {
            newErrors.email = t('InvalidEmailAdress');
            formIsValid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = t('PasswordBetweenCharacters');
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(formData);
        }
    };

    const {t} = useTranslation();

    const {theme} = useTheme()

    return (
        <div className={styles.container}
             style={{background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff'}}>
            <div className={styles.heading}>{t('SignIn')}</div>
            {isLoading ? (
                <Loader/>
            ) : (
                isEmailConfirming ? (
                    <EmailVerification styles={styles} email={formData.email} setErrors={setErrors} errors={errors} isAlready={true} />
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className={styles.form} action="">
                            <div className={styles.inputs}>
                                <input
                                    placeholder={t('E-mail')}
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={styles.input}
                                    onChange={handleChange}
                                />
                                <span className="error-message">{errors.email}</span>
                                <input
                                    placeholder={t('Password')}
                                    id="password"
                                    name="password"
                                    type="password"
                                    className={styles.input}
                                    onChange={handleChange}
                                />
                                <span className="error-message">{errors.password}</span>
                                {serverError?.mainError && <span>{serverError.mainError === "verEmail" ?
                                    <div>{t('YourAccIsNotVerified')} <span className={styles.sendemail} onClick={() => setIsEmailConfirming(true)}>{t('SendVerificationEmail')}</span></div> : serverError.mainError}</span>}
                            </div>
                            <div className={styles.flex_between}>
                            <span className={styles.forgot_password}><Link to="/forgetpass"
                                                                       href="#">{t('ForgotPass')} ?</Link></span>
                                <span className={styles.forgot_password}><Link to="/register"
                                                                               href="#">{t('DontHaveAcc')} ? - {t('SignUp')}</Link></span>
                            </div>
                            <input value={t('SignIn')} type="submit" className={styles.login_button}/>
                        </form>
                        <div className={styles.social_account_container}>
                            <span className={styles.title}>{t('SignInGoogle')}</span>
                            <div className={styles.social_accounts}>
                                <button className={styles.social_button + ' ' + styles.google}>
                                    <svg
                                        viewBox="0 0 488 512"
                                        height="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={styles.svg}
                                    >
                                        <path
                                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )
            )}
        </div>

    )
}

export default LoginForm;