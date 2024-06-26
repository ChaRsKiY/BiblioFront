import {colors} from "../../../assets/styles/colors";
import styles from './InfoBlock.module.scss';
import BooksImage from '../../../assets/images/book-png-25686.png';
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../utils/contexts/ThemeProvider";

const InfoBlock = () => {
    const { t } = useTranslation();

    const { theme } = useTheme()

    return (
        <div className={styles.container} style={{ backgroundColor: theme === 'light' ? colors.ORANGE : colors.DARK_ORANGE}}>
            <img alt="Books Image" src={BooksImage} />
            <div>
                {t('InfoBlockTitle')}
                <div>
                    {t('InfoBlockText')}
                </div>
            </div>
        </div>
    )
}

export default InfoBlock;