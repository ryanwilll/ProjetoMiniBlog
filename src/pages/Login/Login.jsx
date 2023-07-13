import styles from "./Login.module.css";

//* Importação dos componentes do React
import { useEffect, useState } from "react";

//* Importação dos Hooks
import { useAuthenticator } from "../../hooks/useAuthentication";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuthenticator();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const user = {
            email,
            password,
        };

        const res = await login(user);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Entre agora mesmo</h1>
            <p>
                Faça o login para poder utilizar a rede, e publicar a sua
                história!
            </p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira a sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Cadastrar</button>}
                {loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
