import styles from './LogReg.module.scss';
import LoginForm from "../../components/Misc/LoginForm";
import BackImage from "../../assets/images/back.png"
import {useTheme} from "../../utils/contexts/ThemeProvider";
import axios from "axios";
import {SERVER_URL} from "../../data/urls";
import Cookies from "js-cookie";
import tokenStore from "../../stores/TokenStore";
import {useState} from "react";
import userStore from "../../stores/UserStore";
import {useTranslation} from "react-i18next";

const Login = ({navigate}) => {
    const {theme} = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState();

    const { t } = useTranslation();
    const login = async (formData) => {
        setIsLoading(true);

        try {
            const response = await axios.post(SERVER_URL + 'User/login', {
                Email: formData.email,
                Password: formData.password
            });

            const token = response.data.token;

            Cookies.set('token', token, {
                expires: new Date(Date.now() + 259200000),
                path: '/',
            });

            tokenStore.setToken(token)

            navigate('/');
        } catch (e) {
            const errors = {};
            console.error(e)
            if (e.response.status === 401) {
                if (e.response.data === "invalidCredentials") {
                    errors.mainError = t('InvalidCredentialsError');
                } else if (e.response.data === "emailNotVerified") {
                    errors.mainError = "verEmail";
                }
            }

            setServerError(errors);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container + ' ' + (theme === 'light' ? styles.lighttheme : styles.darktheme)}>
            <div className={styles.title}>Biblio</div>
            <img onClick={() => navigate("/")} alt="Back Image" src={BackImage}/>
            <LoginForm login={login} isLoading={isLoading} setServerError={setServerError} serverError={serverError} />
        </div>
    )
}

export default Login;