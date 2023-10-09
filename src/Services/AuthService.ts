import axios from "axios";
import jwtDecode from "jwt-decode";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

interface AxiosError {
    response?: {
        status: number;
        data: any;
    };
}

class AuthService {
    
    // Type guard for axios errors:
    private isAxiosError(error: any): error is AxiosError {
        return !!error && !!error.response && typeof error.response.status === 'number';
    }

    public async register(user: UserModel): Promise<void | string> {
        try {
            const response = await axios.post<string>(appConfig.registerUrl, user);
            const token = response.data;
            authStore.dispatch({ type: AuthActionType.Register, payload: token });
        } catch (error) {
            if (this.isAxiosError(error) && error.response.status === 400) {
                return "Email is already taken!";
            }
            throw error;
        }
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    public async getUserIdFromToken(): Promise<number> {
        const token = authStore.getState().token;
        if (!token) { return 0; }
        const decodedToken = await jwtDecode(token);
        const userId = Promise.resolve((decodedToken as any).user.userId);
        return userId;
    }

    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);
        const user = response.data;
        return user;
    }

    public async isAdmin(): Promise<boolean> {
        const userId = await this.getUserIdFromToken();
        if (userId === 0) return false;
        const user = this.getOneUser(userId);
        const role = (await user).roleId;
        if (role === 1) return true;
        return false;
    }

}

const authService = new AuthService();
export default authService;
