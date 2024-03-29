import Layout from "./components/Layout/Layout";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/LoginRegistration/Login";
import Register from "./pages/LoginRegistration/Register";
import React, {useEffect} from "react";
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
import AddBookPage from "./pages/AddBook/AddBook";
import AdminDashboardPage from "./pages/Admin/AdminDashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import {useTheme} from "./utils/contexts/ThemeProvider";
import AdminContentPage from "./pages/Admin/AdminContent";
import AdminUsersPage from "./pages/Admin/AdminUsers";
import AdminGeneralPage from "./pages/Admin/AdminGeneral";
import {useColorScheme} from "@mui/joy";
import EmailChangeConfirmation from "./pages/EmailChangeConfirmation";

const App = observer(() => {
    const {token} = tokenStore;
    const {user} = userStore;
    const { isLoading } = globalLoaderStore;

    useEffect(() => {
        userStore.updateUser(token);
    }, [token]);

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <GlobalLoading/>
        )
    }

    const {theme} = useTheme()
    const { setMode } = useColorScheme();

    theme === "dark" ? document.body.className = "duration-300 bg-neutral-800" : document.body.className = "duration-300 bg-white"
    setMode(theme === 'dark' ? 'dark' : 'light')

    return (
        <div className={theme === "dark" ? "dark" : ""}>
        <Routes>
            <Route path="/" element={
                <Layout user={user} navigate={navigate} >
                    <Home />
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
                    <Route path="/create-book" element={
                        <Layout user={user} navigate={navigate}>
                            <AddBookPage />
                        </Layout>}
                    />

                    {user.isAdmin && (
                        <>
                            <Route path="/admin/dashboard" element={
                                <AdminLayout>
                                    <AdminDashboardPage />
                                </AdminLayout>}/>
                            <Route path="/admin/content" element={
                                <AdminLayout>
                                    <AdminContentPage />
                                </AdminLayout>}/>
                            <Route path="/admin/users" element={
                                <AdminLayout>
                                    <AdminUsersPage />
                                </AdminLayout>}/>
                            <Route path="/admin/general" element={
                                <AdminLayout>
                                    <AdminGeneralPage />
                                </AdminLayout>}/>
                        </>
                    )}
                </>
            ) : (
                <>
                    <Route path="/login" element={<Login navigate={navigate}/>}/>
                    <Route path="/register" element={<Register navigate={navigate}/>}/>
                    <Route path="/profile" element={<Navigate to="/" replace />}/>
                    <Route path="/forgetpass" element={<ForgetPass navigate={navigate} />}/>
                    <Route path="/forgetpass/change" element={<ForgetPass navigate={navigate} />}/>
                    <Route path="/create-book" element={
                        <Navigate to="/" replace />}
                    />
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
                    <EmailChangeConfirmation />
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
        </div>
    );
})

export default App;
