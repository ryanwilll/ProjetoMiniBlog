//* Importação dos styles
import styles from "./Register.module.css";

//* Importação dos componentes do React
import { useEffect, useState } from "react";

//* Importação dos Hooks
import { useAuthenticator } from "../../hooks/useAuthentication";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthenticator();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const user = {
            displayName,
            email,
            password,
        };

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais.");
            return;
        }

        const res = await createUser(user);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastre-se agora mesmo</h1>
            <p>
                Aproveite e fique a vontade para compartilhar suas histórias com
                os outros usuários.
            </p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Nome do usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
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
                <label>
                    <span>Confirmação de Senha:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Repita a sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Register;
