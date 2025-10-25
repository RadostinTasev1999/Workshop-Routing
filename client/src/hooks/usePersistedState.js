import { useState } from "react";

export default function usePersistedState(initialState){
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem('auth')

        if (!persistedState) {
            return initialState
        }

        const persistedStateData = JSON.parse(persistedState)

        return persistedStateData
    });

    const setPersistedState = (data) => {
        // TODO: update local storage
        const persistedData = JSON.stringify(data) // convert data into JSON string
        localStorage.setItem('auth', persistedData) // save data in localStorage under key 'auth'
        setState(data) // update the state property
    }

    return [
        state,
        setPersistedState
    ]
}
