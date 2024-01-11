import styles from "./LogRegForm.module.scss";
import {useTranslation} from "react-i18next";

const SubmitButton = ({ isLoading, title }) => {
    const { t } = useTranslation();

    if (isLoading)
        return (
            <div className={styles.login_button}>
                <div></div>
            </div>
        )
    else
        return (
            <input value={title} type="submit" className={styles.login_button} disabled={isLoading}/>
        )
}

export default SubmitButton