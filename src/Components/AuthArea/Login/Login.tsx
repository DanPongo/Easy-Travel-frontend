import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {

            await authService.login(credentials);
            swal({
                title: "Welcome back!",
                icon: "success"
            });
            navigate("/vacations");

        }
        catch (err: any) {
            notifyService.error(err)
        }
    }

    return (

        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <input type="text" required autoComplete="off" placeholder="email" className="input" {...register("email" ,CredentialsModel.emailValidation)} />
                <span className="Error">{formState.errors.email?.message}</span>
                <br /><br />

                <input type="password" required autoComplete="off" placeholder="Password" className="input" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>
                <br /><br />

                <button> <span>Login</span></button>
                <br /><br /><br />

                <NavLink to="/register">No account? Sign Up..</NavLink>


            </form>
        </div>
    );
}

export default Login;
