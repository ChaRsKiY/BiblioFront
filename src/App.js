import Layout from "./components/Layout/Layout";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/LoginRegistration/Login";
import Register from "./pages/LoginRegistration/Register";
import {useEffect, useState} from "react";
import Profile from "./pages/Profile/Profile";
import Terms from "./pages/TermsPrivacy/Terms";
import Privacy from "./pages/TermsPrivacy/Privacy";
import tokenStore from "./stores/TokenStore";
import {observer} from "mobx-react";
import userStore from "./stores/UserStore";
import EmailConfirmation from "./pages/EmailConfirmation";
import ForgetPass from "./pages/LoginRegistration/ForgetPass";
import globalLoaderStore from "./stores/GlobalLoaderStore";

const App = observer(() => {
    const [isBannerVisible, setIsBannerVisible] = useState(false)

    const {token} = tokenStore;
    const {user} = userStore;
    const {isLoading} = globalLoaderStore;

    useEffect(() => {
        if (!token) {
            const timer = setTimeout(() => {
                setIsBannerVisible(true);
            }, 6500);

            return () => clearTimeout(timer);
        }
    }, []);

    const hideBanner = () => {
        setIsBannerVisible(false);
    };

    useEffect(() => {
        userStore.updateUser(token);
        globalLoaderStore.setIsLoading(false);
    }, [token]);

    useEffect(() => {
        hideBanner();
    }, [user]);

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div>Loading!!!</div>
        )
    }

    return (
        <Routes>
            <Route path="/" element={
                <Layout user={user} navigate={navigate}>
                    <Home isBannerVisible={isBannerVisible} hideBanner={hideBanner}/>
                </Layout>
            }/>
            {user ? (
                <>
                    <Route path="/login" element={<Navigate to="/" replace />}/>
                    <Route path="/register" element={<Navigate to="/" replace />}/>
                    <Route path="/forgetpass" element={<Navigate to="/" replace />}/>
                    <Route path="/forgetpass/change" element={<Navigate to="/" replace />}/>
                    <Route path="/profile" element={
                        <Layout user={user} navigate={navigate}>
                            <Profile navigate={navigate}/>
                        </Layout>
                    }/>
                </>
            ) : (
                <>
                    <Route path="/login" element={<Login navigate={navigate}/>}/>
                    <Route path="/register" element={<Register navigate={navigate}/>}/>
                    <Route path="/profile" element={<Navigate to="/" replace />}/>
                    <Route path="/forgetpass" element={<ForgetPass navigate={navigate} />}/>
                    <Route path="/forgetpass/change" element={<ForgetPass navigate={navigate} />}/>
                </>
            )}

            <Route path="/confirmation" element={
                <Layout user={user} navigate={navigate}>
                    <EmailConfirmation />
                </Layout>
            }/>
            <Route path="/emailchangeconfirm" element={
                <Layout user={user} navigate={navigate}>
                    <EmailConfirmation />
                </Layout>
            }/>
            <Route path="/terms" element={
                <Layout user={user} navigate={navigate}>
                    <Terms/>
                </Layout>
            }/>
            <Route path="/privacy" element={
                <Layout user={user} navigate={navigate}>
                    <Privacy/>
                </Layout>
            }/>
            <Route path="*" element={<Page404/>}/>
        </Routes>
    );
})

export default App;
