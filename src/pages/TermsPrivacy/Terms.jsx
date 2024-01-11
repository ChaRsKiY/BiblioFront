import styles from './TermsPrivacy.module.scss'
import {useTranslation} from "react-i18next";
import {useTheme} from "../../utils/contexts/ThemeProvider";

const Terms = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()

  return (
      <div className={styles.container} style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
          <div className={styles.title}>{t('Terms')}</div>

          <ol>
              <li>{t('AcceptanceofTerms')}:
                  <p>{t('AcceptanceofTermsText')}</p>
              </li>
              <li>{t('UserAccounts')}:
                  <p>{t('UserAccountsText')}</p>
              </li>
              <li>{t('ContentAccessibility')}:
                  <p>{t('ContentAccessibilityText')}</p>
              </li>
              <li>{t('IntellectualProperty')}:
                  <p>{t('IntellectualPropertyText')}</p>
              </li>
              <li>{t('UsageRestrictions')}:
                  <p>{t('UsageRestrictionsText')}</p>
              </li>
              <li>{t('PrivacyPolicy')}:
                  <p>{t('PrivacyPolicyText')}</p>
              </li>
              <li>{t('Cookies')}:
                  <p>{t('CookiesText')}</p>
              </li>
              <li>{t('TerminationofService')}:
                  <p>{t('TerminationofServiceText')}</p>
              </li>
              <li>{t('Feedback')}:
                  <p>{t('FeedbackText')}</p>
              </li>
              <li>{t('Disclaimers')}:
                  <p>{t('DisclaimersText')}</p>
              </li>
              <li>{t('ChangestoTerms')}:
                  <p>{t('ChangestoTermsText')}</p>
              </li>
              <li>{t('ContactInformation')}:
                  <p>{t('ContactInformationText')}</p>
              </li>
          </ol>
      </div>
  )
}

export default Terms