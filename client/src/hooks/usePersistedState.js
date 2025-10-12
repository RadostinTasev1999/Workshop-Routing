import { useState } from "react";

export default function usePersistedState(stateKey, initialState){
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(stateKey);
        if (!persistedState) {
             return typeof initialState === 'function' ? initialState() : initialState;
        }

        const persistedStateData = JSON.parse(persistedState);

        return persistedStateData 
        /*
        If we have a key with name 'auth' in local storage, we will
        retrive this key's value and parse it to an object
        The parsed values from key 'auth' retrieved from local storage,
        will be the initial state value.
        */
    });

    const setPersistedState = (input) => {

        const data = typeof input === 'function' ? input(state) : (input);

        const persistedData = JSON.stringify(data); // convert the value to JSON string

        localStorage.setItem(stateKey, persistedData); // Add key to the given storage object

        setState(data)
    };

    return [
        state,
        setPersistedState
    ]

}