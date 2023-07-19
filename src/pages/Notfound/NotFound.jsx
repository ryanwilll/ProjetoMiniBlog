import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h2>Ops, parece que você se perdeu....</h2>
            <p>
                A página que você está tentando acessar não existe ou
                encontra-se em manutenção neste momento, por favor, tente
                novamente mais tarde!
            </p>

            <Link to="/" className="btn">
                Voltar para o início
            </Link>
        </div>
    );
};

export default NotFound;
