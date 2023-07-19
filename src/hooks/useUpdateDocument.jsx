import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};

const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };

        case "UPDATE_DOC":
            return { loading: false, error: null };

        case "ERROR":
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const useUpdateDocument = (docColletion) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const updateDocument = async (id, data) => {
        checkCancelledBeforeDispatch({
            type: "LOADING",
        });
        try {
            const docRef = await doc(db, docColletion, id);
            const updateDocument = await updateDoc(docRef, data);

            checkCancelledBeforeDispatch({
                type: "UPDATE_DOC",
                payload: updateDocument,
            });
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { updateDocument, response };
};
