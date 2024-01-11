import styles from './Layout.module.scss'
import Header from "./Header";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const Layout = ({ children, user, navigate }) => {
    const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false)

    const location = useLocation();

    useEffect(() => {
        setIsBurgerMenuActive(false)
    }, [location.pathname]);

    const handleChildrenClicked = () => {
        if (isBurgerMenuActive) {
            setIsBurgerMenuActive(false)
        }
    }

    return (
        <>
            <Header styles={styles} user={user} isBurgerMenuActive={isBurgerMenuActive} setIsBurgerMenuActive={setIsBurgerMenuActive} location={location} navigate={navigate} />
                <div onClick={handleChildrenClicked}>{children}</div>
            <Footer styles={styles} />
        </>
    )
}

export default Layout;