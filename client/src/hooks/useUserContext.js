import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
    const data = useContext(UserContext)

    return data
}