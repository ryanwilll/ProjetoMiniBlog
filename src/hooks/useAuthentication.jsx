import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthenticator = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //* CleanUp
    const [cancelled, setCancelled] = useState(false);
    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    //* Register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, { displayName: data.displayName });

            setLoading(false);
            return user;
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("password")) {
                systemErrorMessage =
                    "A senha precisa conter no mínimo 6 caracters.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage =
                    "O e-mail cadastrado já existe, tente com outro e-mail.";
            } else if (error.message.includes("invalid-email")) {
                systemErrorMessage =
                    "O e-mail utilizado é inválido, tente novamente com outro.";
            } else {
                systemErrorMessage =
                    "Ocorreu um erro ao processar os dados, tente novamente mais tarde.";
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    //* Logout
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    //* Login
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            } else {
                systemErrorMessage =
                    "Ocorreu um erro ao processar os dados, tente novamente mais tarde.";
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { auth, createUser, error, loading, logout, login };
};
