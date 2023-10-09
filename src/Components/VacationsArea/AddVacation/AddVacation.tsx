import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    useVerifyLoggedIn();

    
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    
    // const currentDate = new Date().toISOString().split("T")[0];

    async function send(vacation: VacationModel) {
        
        if (new Date(vacation.checkIn) > new Date(vacation.checkOut)) {
            return notifyService.error("Make check in before check out..");
        }
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Added successfully");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }

    }

    const [file, setFile] = useState<File>(null);
    const changeHandler = (e: any) => {
        const file1 = e.target.files[0];
        setFile(file1);
    }

    return (

        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add Vacation</h2>
                <br />

                <textarea rows={3} autoComplete="off" placeholder="Description" className="Input" {...register("description", VacationModel.descriptionValidation)} required />
                <span className="Error">{formState.errors.description?.message}</span>
                <br />

                <input type="text" autoComplete="off" placeholder="Destination" className="Input" {...register("destination", VacationModel.destinationValidation)} required />
                <span className="Error">{formState.errors.destination?.message}</span>

                <label>Check in: </label>
                <input type="date" autoComplete="off" placeholder="checkIn" className="Input"  {...register("checkIn", VacationModel.checkInValidation)} required min="0" />
                <span className="Error">{formState.errors.checkIn?.message}</span>

                <label>Check out: </label>
                <input type="date" autoComplete="off" placeholder="checkOut" className="Input"  {...register("checkOut", VacationModel.checkOutValidation)} required min="0" />
                <span className="Error">{formState.errors.checkOut?.message}</span>


                <input type="number" autoComplete="off" placeholder="price" className="Input" {...register("price", VacationModel.priceValidation)} required min="0" />
                <span className="Error">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" className="Input" onChangeCapture={changeHandler} accept="image/*" {...register("image")} required />
                {file && <img src={URL.createObjectURL(file)} />}

                <button> Add </button>

            </form>

        </div>
    );
}

export default AddVacation;
