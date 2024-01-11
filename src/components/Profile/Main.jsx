import Loader from "../Misc/Loader";
import Cookies from "js-cookie";
import tokenStore from "../../stores/TokenStore";
import userStore from "../../stores/UserStore";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import EditMode from "./EditMode";
import NormalMode from "./NormalMode";
import Additional from "./Additional";

const Main = ({styles, userData, t, theme, fetch}) => {
    const navigate = useNavigate()
    const [isUserEditingActive, setIsUserEditingActive] = useState(false)

    const handleLogOut = () => {
        Cookies.set("token", null, {expires: new Date(0)})
        tokenStore.setToken(null)
        userStore.setUser(null)
        navigate('/');
    }

    return (
        <>
            {userData ? (
                isUserEditingActive ? (
                    <EditMode userData={userData} setIsUserEditingActive={setIsUserEditingActive} styles={styles} t={t} theme={theme} fetch={fetch} />
                ) : (
                    <>
                        <NormalMode t={t} userData={userData} styles={styles} handleLogOut={handleLogOut} setIsUserEditingActive={setIsUserEditingActive} theme={theme} />
                        <Additional styles={styles} />
                    </>
                )
            ) : (
                <Loader/>
            )}
        </>
    )
}

export default Main;