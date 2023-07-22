// * CSS Importações
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail/PostDetail";
import FormSearch from "../../components/FormSearch/FormSearch";

//* Componentes

const Home = () => {
    const { documents: posts, loading } = useFetchDocuments("posts");

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>
            <FormSearch />
            <div>
                {loading && <p>Carregando...</p>}
                {posts &&
                    posts.map(
                        (post) => (
                            console.log(post),
                            (<PostDetail key={post.id} post={post} />)
                        )
                    )}
                {posts && posts.length === 0 && (
                    <div className="noposts">
                        <p>
                            Eita! Parece que você é um dos nossos primeiros
                            usuários, e ainda não temos nenhum post disponível.
                        </p>
                        <p>
                            Mas, sinta-se a vontade para criar uma agora mesmo.
                        </p>
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
