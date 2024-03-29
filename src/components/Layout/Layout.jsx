import styles from './Layout.module.scss'
import Header from "./Header";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AIMessenger from "./AIMessanger";

const Layout = ({ children, user, navigate }) => {
    const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false)
    const [isAIOpen, setIsAIOpen] = useState(false)
    const [aiMessages, setAiMessages] = useState([])

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

            {isAIOpen ? <AIMessenger setAiMessages={setAiMessages} aiMessages={aiMessages} setIsAIOpen={setIsAIOpen} /> : (
                <div
                    className="fixed right-10 bottom-10 rounded-full bg-orange-300 w-14 h-14 flex justify-center items-center text-white text-2xl cursor-pointer"
                    onClick={() => setIsAIOpen(!isAIOpen)}>
                    BI
                </div>
            )}
        </>
    )
}

export default Layout;