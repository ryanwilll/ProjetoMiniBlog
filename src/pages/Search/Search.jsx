import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

//* Hooks
import PostDetail from "../../components/PostDetail/PostDetail";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFetchDocuments("posts", search);

    return (
        <div className={styles.search_container}>
            <h2>Resultados para a sua pesquisa:</h2>
            <div>
                {posts && posts.length == 0 && (
                    <div className={styles.nopost}>
                        <p>
                            Não foi possível encontrar nenhum post com esses
                            parâmetros de busca.
                        </p>
                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
};

export default Search;
