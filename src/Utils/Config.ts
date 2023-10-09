class Config {
    public vacationsUrl = "https://easy-travel-backend-z.onrender.com/api/vacations/";
    public vacationsUsersUrl = "https://easy-travel-backend-z.onrender.com/api/vacations-users/";
    public followersUrl = "https://easy-travel-backend-z.onrender.com/api/followers/";
    public registerUrl = "https://easy-travel-backend-z.onrender.com/api/auth/register/";
    public loginUrl = "https://easy-travel-backend-z.onrender.com/api/auth/login/";
    public vacationsImageUrl = "https://easy-travel-backend-z.onrender.com/api/vacations/images/";
    public usersUrl = "https://easy-travel-backend-z.onrender.com/api/users/";
    public editVacationUrl = "https://easy-travel-backend-z.onrender.com/api/vacations/edit/";
}


const appConfig = new Config(); // Singleton

export default appConfig;
