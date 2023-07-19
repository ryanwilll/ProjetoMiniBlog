import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
    const { user } = useAuthValue();
    const uid = user.uid;

    //! Posts do usuário
    const {
        documents: posts,
        loading,
        error,
    } = useFetchDocuments("posts", null, uid);

    const { deleteDocument } = useDeleteDocument("posts");

    return (
        <div className={styles.dashboard}>
            {loading && <p>Carregando...</p>}

            <h2>Dashboard</h2>
            <p>Gerencie o seus posts</p>
            {posts && posts.length == 0 ? (
                <div className={styles.noposts}>
                    <p>Não foi possível encontrar nenhum post do seu usuário</p>
                    <p>Então não perca tempo, crie o seu post agora mesmo!</p>
                    <Link to="/posts/create" className="btn">
                        Criar Post
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.post_header}>
                        <span>Titulo</span>
                        <span>Ações</span>
                    </div>

                    {posts &&
                        posts.map((post) => (
                            <div key={post.id} className={styles.post_row}>
                                <p>{post.title}</p>
                                <div>
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="btn btn-outline"
                                    >
                                        Ver Post
                                    </Link>
                                    <Link
                                        to={`/posts/edit/${post.id}`}
                                        className="btn btn-outline"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => deleteDocument(post.id)}
                                        className="btn btn-outline btn-danger"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default Dashboard;
