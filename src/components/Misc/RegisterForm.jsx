import styles from './LogRegForm.module.scss';
import {Link} from "react-router-dom";
import {useState} from "react";
import validator from "validator";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import Loader from "./Loader";
import {SERVER_URL} from "../../data/urls";
import axios from "axios";
import EmailVerification from "./EmailVerification";

const LoginForm = ({register, serverError, setServerError, isLoading, isEmailConfirming}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
        setServerError({...serverError, [name + "Exist"]: ''})
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = t('UsernameRequired');
            formIsValid = false;
        } else if (formData.username.length < 3 || formData.username.length > 20) {
            newErrors.username = t('UsernameBetweenCharacters');
            formIsValid = false;
        } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
            newErrors.username = t('InvalidCharactersUsername');
            formIsValid = false;
        }

        if (!validator.isEmail(formData.email)) {
            newErrors.email = t('InvalidEmailAdress');
            formIsValid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = t('PasswordBetweenCharacters');
            formIsValid = false;
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(formData.password)) {
            newErrors.password = t('PasswordContainsDigits');
            formIsValid = false;
        }

        if (formData.password !== formData.passwordRepeat) {
            newErrors.passwordRepeat = t('PasswordsDoNotMatch');
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            register(formData);
        }
    }

    const {t} = useTranslation();

    const {theme} = useTheme()

    return (
        <div className={styles.container}
             style={{background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff'}}>
            <div className={styles.heading}>{t('SignUp')}</div>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    isEmailConfirming ? (
                        <EmailVerification styles={styles} errors={errors} setErrors={setErrors} email={formData.email} isAlready={false} />
                    ) : (<>
                            <form className={styles.form} action="" onSubmit={handleSubmit}>
                                <div className={styles.inputs}>
                                    <input
                                        placeholder={t('Username')}
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        className={styles.input}
                                        onChange={handleChange}
                                    />
                                    <span className="error-message">{errors.username}</span>
                                    {serverError?.userExist &&
                                        <span className="error-message">{serverError.userExist}</span>}
                                    <input
                                        placeholder={t('E-mail')}
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        className={styles.input}
                                        onChange={handleChange}
                                    />
                                    <span className="error-message">{errors.email}</span>
                                    {serverError?.emailExist &&
                                        <span className="error-message">{serverError.emailExist}</span>}
                                    <input
                                        placeholder={t('Password')}
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        className={styles.input}
                                        onChange={handleChange}
                                    />
                                    <span className="error-message">{errors.password}</span>
                                    <input
                                        placeholder={t('PassRepeat')}
                                        id="passwordRepeat"
                                        name="passwordRepeat"
                                        type="password"
                                        value={formData.passwordRepeat}
                                        className={styles.input}
                                        onChange={handleChange}
                                    />
                                    <span className="error-message">{errors.passwordRepeat}</span>
                                </div>
                                <div className={styles.flex_between}>
                                <span className={styles.forgot_password}><Link to="/login"
                                                                               href="#">{t('AlreadyHaveAnAccount')} ? - {t('SignIn')}</Link></span>
                                </div>
                                <input value={t('SignUp')} type="submit" className={styles.login_button}/>
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
                )
            }

        </div>

    )
}

export default LoginForm;