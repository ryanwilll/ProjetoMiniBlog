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
            console.error(error.message);
            console.error(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage =
                    "A senha precisa conter no mínimo 6 caracters.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage =
                    "O e-mail cadastrado já existe, tente com outro e-mail.";
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

    return { auth, createUser, error, loading };
};
