// * CSS Importações
import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

//* Componentes

const Home = () => {
    const [query, setQuery] = useState("");
    const [posts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    name="search"
                    placeholder="Busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>
            <div>
                <h2>POSTSS</h2>
                {posts && posts.length === 0 && (
                    <div className="noposts">
                        <p>Não conseguimos encontrar nenhum post...</p>
                        <p>Seja o primeiro a criar um post</p>
                        <Link to="/posts/create" className="btn">
                            Criar Primeiro Post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
