import styles from "./EditPost.module.css";

//* Importações de Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import { useParams } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const { user } = useAuthValue();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const { updateDocument, response } = useUpdateDocument("posts");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    }, [post]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        //? Validação da imagem
        try {
            new URL(image);
        } catch (error) {
            console.error(error.message);
            setFormError("A imagem precisa ser uma URL");
        }

        //? Criação do array de tags

        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());
        //? Checagem dos valores

        if (!title || !image || !body || !tags) {
            setFormError("Por favor, preencha todos os campos.");
        }
        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);

        //? Redirect Home
        navigate("/dashboard");
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post {post.title}</h2>
                    <p>
                        Altere os dados do post conforme desejado, e
                        posteriormente salve o mesmo.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título</span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Pense em um bom título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>URL da imagem</span>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder="Insira uma imagem que representa o seu post"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </label>
                        <p className={styles.preview_title}>
                            Preview da imagem
                        </p>
                        <img
                            src={post.image}
                            alt={post.title}
                            className={styles.image_preview}
                        />
                        <label>
                            <span>Contéudo</span>
                            <textarea
                                name="body"
                                required
                                placeholder="Insira o conteúdo do post"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>
                        </label>
                        <label>
                            <span>Tags</span>
                            <input
                                type="text"
                                name="tags"
                                required
                                placeholder="Insira as tags separadas por vírgula"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </label>
                        {!response.loading && (
                            <button className="btn">Salvar</button>
                        )}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && (
                            <p className="error">{response.error}</p>
                        )}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;
