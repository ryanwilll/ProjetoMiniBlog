import styles from "./Post.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import { useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div className={styles.postContainer}>
            {loading && <p>Carregando...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h3>
                        Este post envolve:
                        <div className={styles.tags}>
                            {post.tagsArray.map((tag) => (
                                <p key={tag}>
                                    <span>#</span>
                                    {tag}
                                </p>
                            ))}
                        </div>
                    </h3>
                </>
            )}
        </div>
    );
};

export default Post;
