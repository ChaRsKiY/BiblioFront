import Layout from "./components/Layout/Layout";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/LoginRegistration/Login";
import Register from "./pages/LoginRegistration/Register";
import React, {Suspense, useEffect, useState} from "react";
import Profile from "./pages/Profile/Profile";
import Terms from "./pages/TermsPrivacy/Terms";
import Privacy from "./pages/TermsPrivacy/Privacy";
import tokenStore from "./stores/TokenStore";
import {observer} from "mobx-react";
import userStore from "./stores/UserStore";
import EmailConfirmation from "./pages/EmailConfirmation";
import ForgetPass from "./pages/LoginRegistration/ForgetPass";
import Books from "./pages/Books/Books";
import Home from "./pages/Home";
import CurrentBook from "./pages/CurrentBook/CurrentBook";
import globalLoaderStore from "./stores/GlobalLoaderStore";
import GlobalLoading from "./pages/GlobalLoader/GlobalLoading";

const App = observer(() => {
    const [isBannerVisible, setIsBannerVisible] = useState(false)

    const {token} = tokenStore;
    const {user} = userStore;
    const { isLoading } = globalLoaderStore;

    const hideBanner = () => {
        setIsBannerVisible(false);
    };

    useEffect(() => {
        userStore.updateUser(token);
    }, [token]);

    useEffect(() => {
        hideBanner();
    }, [user]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            const timer = setTimeout(() => {
                setIsBannerVisible(true);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (isLoading) {
        return (
            <GlobalLoading/>
        )
    }

    return (
        <Routes>
            <Route path="/" element={
                <Layout user={user} navigate={navigate} >
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
            <Route path="/books" element={
                <Layout user={user} navigate={navigate}>
                    <Books />
                </Layout>
            }/>
            <Route path="/books/:bookId" element={
                <Layout user={user} navigate={navigate}>
                    <CurrentBook />
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
