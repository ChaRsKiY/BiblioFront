import axios from "axios";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const EmailVerification = ({ styles, errors, setErrors, email, isAlready }) => {
    const [message, setMessage] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const resendEmail = async () => {
        try {
            setIsLoading(true)
            setErrors({})
            setMessage("")
            await axios.post("User/resendverificationcode", {Email: email})
            setMessage(t('MessageHasBeenSent'))
        } catch (e) {
            if (e.response.status === 400) {
                if (e.response.data === "alreadyVerified") {
                    setErrors({VerificationError: t('UserAlreadyVerified')});
                } else if (e.response.data === "userExist") {
                    setErrors({VerificationError: t('UserExist')});
                }
            } else if (e.response.status === 429) {
                setErrors({VerificationError: t('TooManyRequestsTryInThreeMinutes')})
            }
        } finally {
            setIsLoading(false)
        }
    }

    const { t } = useTranslation();

    useEffect(() => {
        if (isAlready) {
            resendEmail()
        }
    }, []);

  return (
      <div className={styles.emailconfirm}>
          <div className={styles.text}>{t('EmailConfirmSent')}</div>

          <span className={styles.vererror}>{errors.VerificationError}</span>
          <span className={styles.vermessage}>{message}</span>
          <div className={styles.resend}>{t('DidntReceiveEmail')}<span
              onClick={() => !isLoading && resendEmail()}>{t('ResendIt')}</span>.
          </div>
      </div>
  )
}

export default EmailVerification