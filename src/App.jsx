//* Importações
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//* Importação de Hooks
import { useEffect, useState } from "react";
import { useAuthenticator } from "./hooks/useAuthentication";

//* Importação de Contextos
import { AuthContextProvider } from "./context/AuthContext";

//* Importação dos Styles
import "./App.css";

//* Importações Páginas
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

//* Importação de componentes
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CreatePost from "./pages/CreatPost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthenticator();
    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <AuthContextProvider value={{ user }}>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/register"
                                element={
                                    !user ? <Register /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/posts/create"
                                element={
                                    user ? (
                                        <CreatePost />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
