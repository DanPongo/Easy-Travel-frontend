import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);

            return () => {
                unsubscribe();
            };

        });

    }, []);

    return (
        <div className="AuthMenu">

            {!user && <>
                <span>Welcome traveler  </span>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </>}
            {user?.roleId === 2 && <>
                <span>Hello {user.firstName} {user.lastName}  </span>
                <NavLink to="/logout">Logout</NavLink>
            </>}
            {user?.roleId === 1 && <>
                <span>Hello Daniel</span>
                <NavLink to="/logout">Logout</NavLink>
            </>
            }

        </div>
    );
}

export default AuthMenu;
