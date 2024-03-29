import styles from './LogReg.module.scss';
import RegisterForm from "../../components/Misc/RegisterForm";
import BackImage from "../../assets/images/back.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";

const Register = observer(({navigate}) => {
    const [serverError, setServerError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailConfirming, setIsEmailConfirming] = useState(false)

    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Biblio - Register"
    }, []);

    const register = async (formData) => {
        try {
            setIsLoading(true);

            const response = await axios.post('User/register', {
                UserName: formData.username,
                Email: formData.email,
                Password: formData.password
            });

            if (response.status === 200) {
                setIsEmailConfirming(true)
            }
        } catch (e) {
            const errors = {};

            if (e.response.status === 400) {
                if(e.response.data === "usernameExist") {
                    errors.userExist = t('UsernameExistError');
                }
                if(e.response.data === "emailExist") {
                    errors.emailExist = t('EmailExistError');
                }
            }

            setServerError(errors);
        } finally {
            setIsLoading(false);
        }
    }

    const { theme } = useTheme()

    return (
        <div className={styles.container + ' ' + (theme === 'light' ? styles.lighttheme : styles.darktheme)}>
            <div className={styles.title}>Biblio</div>
            <img onClick={() => navigate("/")} alt="Back Image" src={BackImage}/>
            <RegisterForm isLoading={isLoading} serverError={serverError} setServerError={setServerError} register={register} isEmailConfirming={isEmailConfirming} />
        </div>
    )
})

export default Register;