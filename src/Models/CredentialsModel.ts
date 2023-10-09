class CredentialsModel {

    public email: string;
    public password: string;

    public static emailValidation = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 4, message: "email too short" },
        maxLength: { value: 100, message: "email too long" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password too short" },
        maxLength: { value: 100, message: "Password too long" }
    }

}

export default CredentialsModel;