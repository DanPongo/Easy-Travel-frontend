class VacationModel {

    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public checkIn: string;
    public checkOut: string;
    public price: number;
    public followersAmount: number;
    public image?: FileList;
    public isFollow: number;

    public static descriptionValidation = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 10, message: "Description cannot be less then 10 charts" },
        maxLength: { value: 2500, message: "Description cant exceed 2500 charts" }
    }

    public static destinationValidation = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "Destination cannot be less then 2 charts" },
        maxLength: { value: 70, message: "Destination cant exceed 70 charts" }
    }

    public static checkInValidation = {
        required: { value: true, message: "Missing check in date" }
        // minLength: { value: 2, message: "Check In too short" },
        // maxLength: { value: 20, message: "Check In too long" }
    }

    public static checkOutValidation = {
        required: { value: true, message: "Missing check out date" }
        // minLength: { value: 2, message: "Check Out too short" },
        // maxLength: { value: 20, message: "Check Out too long" }
    }
    public static priceValidation = {
        required: { value: true, message: "Please enter a price" },
        min: { value: 90, message: "Price must be greater than 90" },
        max: { value: 40000, message: "Price can't be more then a 40000" }
    }

}

export default VacationModel;