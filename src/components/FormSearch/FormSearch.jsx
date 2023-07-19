import styles from "./FormSearch.module.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormSearch = () => {
    const [query, setQuery] = useState("");
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return Navigate(`/search?q=${query.toLowerCase()}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    name="search"
                    placeholder="Busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>
        </>
    );
};

export default FormSearch;
