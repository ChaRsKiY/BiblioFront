import {useState} from "react";
import updateUserData from "../../utils/updateUserData";
import tokenStore from "../../stores/TokenStore";
import UploadImg from "../../assets/images/upload.png"
import userStore from "../../stores/UserStore";

const EditMode = ({userData, setIsUserEditingActive, styles, t, fetch}) => {
    const [changeData, setChangeData] = useState({
        UserName: "",
        Name: "",
        Surname: "",
        Bio: "",
        AvatarFile: ""
    })

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (changeData.UserName.length > 0 && (changeData.UserName.length < 3 || changeData.UserName.length > 20)) {
            newErrors.UserName = 'Username must be between 3 and 20 characters';
            formIsValid = false;
        } else if (changeData.UserName.length > 0 && !/^[a-zA-Z0-9_-]*$/.test(changeData.UserName)) {
            newErrors.UserName = 'Invalid characters in username';
            formIsValid = false;
        }

        if (changeData.Name.length > 0 && (changeData.Name.length < 2 || changeData.Name.length > 20)) {
            newErrors.Name = 'Name must be between 2 and 20 characters';
            formIsValid = false;
        } else if (changeData.Name.length > 0 && !/^[a-zA-Z0-9_-]*$/.test(changeData.Name)) {
            newErrors.Name = 'Invalid characters in name';
            formIsValid = false;
        }

        if (changeData.Surname.length > 0 && (changeData.Surname.length < 2 || changeData.Surname.length > 20)) {
            newErrors.Surname = 'Surname must be between 2 and 20 characters';
            formIsValid = false;
        } else if (changeData.Surname.length > 0 && !/^[a-zA-Z0-9_-]*$/.test(changeData.Surname)) {
            newErrors.Surname = 'Invalid characters in surname';
            formIsValid = false;
        }

        if (changeData.Bio.length > 150) {
            newErrors.Bio = 'Biography must be less than 150 characters';
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleFormChanged = (e) => {
        const { name, value } = e.target;

        setChangeData((prev) => ({ ...prev, [name]: value }));
        setErrors({ ...errors, [name]: '' });
    }

    const handleAvatarChanged = (e) => {
        const name = "AvatarFile";
        setChangeData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    };

    const { token } = tokenStore;

    const handleDataChange = async () => {
        if (validateForm())
        {
            const response = await updateUserData(token, changeData);

            if (response === "usernameExist") {
                setErrors({ UserName: t("UsernameExistError") })
            } else {
                await userStore.initialize(token)
                await fetch(token);
                setIsUserEditingActive(false)
            }
        }
    }

    return (
        <>
            <div className={styles.triplecontainer}>
                <div className={styles.doublecontainer}>

                    <label htmlFor="AvatarFile" className={styles.changeavatar}>
                        <div className={styles.shadow}>
                            <img src={UploadImg}/>
                        </div>

                        <img alt="Avatar Image" className={styles.avatar}
                             src={changeData.AvatarFile ? URL.createObjectURL(changeData.AvatarFile) : "https://localhost:7000/User/avatar/" + userData.avatar}/>
                    </label>
                    <input type="file" id="AvatarFile" hidden onChange={handleAvatarChanged}
                           accept=".jpeg, .jpg, .png, .webp, .gif"/>

                    <div className={styles.verticalcontainer}>
                        <div className={styles.hint}>{t('Username')}</div>
                        <input onChange={handleFormChanged} type="text" placeholder={userData.userName} name="UserName"
                               className={styles.input}/>
                        <div className={styles.errormessage}>{errors.UserName}</div>
                    </div>
                </div>
                <button onClick={handleDataChange} className={styles.conlog + ' ' + (styles.confirm)}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                    </div>
                </button>
            </div>

            <div className={styles.hint} style={{marginTop: '20px'}}>{t('Biography')}</div>
            <textarea onChange={handleFormChanged} name="Bio" placeholder={userData.bio ? userData.bio : ''}
                      className={styles.textarea}
                      style={{marginBottom: '10px'}}/>
            <div className={styles.errormessage}>{errors.Bio}</div>

            <div className={styles.editcontainer}>
                <div>
                    <div className={styles.hint}>{t('Name')}</div>
                    <input onChange={handleFormChanged} type="text" placeholder={userData.name} name="Name"
                           className={styles.input}/>
                    <div className={styles.errormessage}>{errors.Name}</div>
                </div>
                <div>
                    <div className={styles.hint}>{t('Surname')}</div>
                    <input onChange={handleFormChanged} type="text" placeholder={userData.surname} name="Surname"
                           className={styles.input}/>
                    <div className={styles.errormessage}>{errors.Surname}</div>
                </div>
            </div>

            <div className={styles.edit} onClick={() => setIsUserEditingActive(false)}>{t('Back')}</div>
        </>
    )
}

export default EditMode