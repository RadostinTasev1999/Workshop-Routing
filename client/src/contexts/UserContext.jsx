import { createContext } from "react";
// import usePersistedState from "../hooks/usePersistedState";

export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});



