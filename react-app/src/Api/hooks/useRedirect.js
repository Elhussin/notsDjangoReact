// useRedirect.js
import { useNavigate } from "react-router-dom";


export const useRedirect = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login", { replace: true });
    };

    return { redirectToLogin };
};