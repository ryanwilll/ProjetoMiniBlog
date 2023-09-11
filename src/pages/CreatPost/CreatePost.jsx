import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import styles from "./CreatePost.module.css";

//* Importações de Hooks
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
    const { user } = useAuthValue();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();

    const editor = useRef(null);
    const config = {
        height: 500,
        readonly: false,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        try {
            new URL(image);
        } catch (error) {
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

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        //? Redirect Home
        navigate("/");
    };

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>
                Publique o que você quiser, fique a vontade na rede e
                compartilhe o seu conhecimento.
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
                <label>
                    <span>Contéudo</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insira o conteúdo do post"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    {/* <JoditEditor
                        ref={editor}
                        value={body}
                        config={config}
                        onBlur={(e) => setBody(e.target.value)} // preferred to use only this option to update the content for performance reasons
                    /> */}
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
                    <button className="btn">Cadastrar</button>
                )}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
