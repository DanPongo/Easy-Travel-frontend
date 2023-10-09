import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

// Custom Hook
function useVerifyLoggedIn() {

    const navigate = useNavigate();

    useEffect(() => {

        // If no token
        if (!authStore.getState()?.token) {
            notifyService.error("You are not logged in!");
            navigate("/login");
        }

    }, []);

}

export default useVerifyLoggedIn;