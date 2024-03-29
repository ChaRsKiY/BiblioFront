import styles from './TermsPrivacy.module.scss'
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useEffect} from "react";

const Terms = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()

    useEffect(() => {
        document.title = "Biblio - Privacy"
    }, []);

    return (
        <div className={styles.container} style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            <div className={styles.title}>{t('Privacy')}</div>

            <div className={styles.additional}>{t('PrivacyAdditional')}</div>

            <ol className="space-y-4">
                <li >{t('InformationWeCollect')}:
                    <p>{t('InformationWeCollectText')}</p>
                </li>
                <li>{t('HowWeUseYourInformation')}:
                    <p>{t('HowWeUseYourInformationText')}</p>
                </li>
                <li>{t('InformationSharing')}:
                    <p>{t('InformationSharingText')}</p>
                </li>
                <li>{t('SecurityMeasures')}:
                    <p>{t('SecurityMeasuresText')}</p>
                </li>
                <li>{t('YourChoices')}:
                    <p>{t('YourChoicesText')}</p>
                </li>
                <li>{t('ChildrensPrivacy')}:
                    <p>{t('ChildrensPrivacyText')}</p>
                </li>
                <li>{t('ChangestoThisPrivacyPolicy')}:
                    <p>{t('ChangestoThisPrivacyPolicyText')}</p>
                </li>
                <li>{t('ContactUs')}:
                    <p>{t('ContactUsText')}</p>
                </li>
            </ol>
        </div>
    )
}

export default Terms