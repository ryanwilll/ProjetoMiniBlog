//* Importações
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

function App() {
    return (
        <>
            <AuthContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
