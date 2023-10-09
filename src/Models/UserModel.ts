import RoleModel from "./RoleModel";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public static firstNameValidation = {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name too short" },
        maxLength: { value: 20, message: "First name too long" }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name too short" },
        maxLength: { value: 20, message: "Last name too long" }
    }

    public static emailValidation = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 4, message: "email too short" },
        maxLength: { value: 100, message: "email too long" },
        pattern: {
            value: /\.com$/,
            message: "Only valid email address"
        }
    }
    
    
    public static passwordValidation = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password too short" },
        maxLength: { value: 100, message: "Password too long" }
    }

}

export default UserModel;