import "./VacationCardAdmin.css";
import swal from "sweetalert";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";
import vacationsService from "../../../Services/VacationsService";
import deleteBtn from "../../../Assets/Images/deleteBtn.png"
import editBtn from "../../../Assets/Images/editBtn.png"

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCardAdmin(props: VacationCardProps): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const navigate = useNavigate();

    function showDescription(vacation: VacationModel) {
        swal(vacation.description);

    }

    async function deleteVacation(vacationId: number) {
        try {
            const willDelete = await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this vacation!",
                icon: "warning",
                buttons: ["Cancel", "Yes, delete it!"],
                dangerMode: true,
            });
            
            if (willDelete) {
                await vacationsService.deleteVacation(vacationId);
                swal({
                    title: "Vacation deleted successfully",
                    icon: "success"
                });
                navigate("/vacations");
            }
    
        } catch (err: any) {
            swal({
                title: err,
                icon: "error"
            });
        }
    }
    

    useEffect(() => {
        const unsubscribe = vacationsStore.subscribe(() => {
            let duplicateVacations = [...vacations];
            setVacations(duplicateVacations);

            return () => unsubscribe();
        });

    }, []);

    return (

        <div className="VacationCardAdmin">

            <div className="AdminsCard">

                <button className="EditBtn" ><NavLink to={"/vacations/edit/" + props.vacation.vacationId}><img className="EditButton" src={editBtn} /></NavLink></button>

                <button className="DeleteBtn" onClick={() => deleteVacation(props.vacation.vacationId)}><img className="DeleteButton" src={deleteBtn} /></button>
                <br />
                <img crossOrigin="anonymous" src={appConfig.vacationsImageUrl + props.vacation.imageName} />

                <p className="Destination">{props.vacation.destination}</p>
                <p>Check In: {props.vacation.checkIn}</p>
                <p>Check Out: {props.vacation.checkOut}</p>
                <p>Price: {props.vacation.price}$</p>

                <br />

                <button className="Description" id="card-button" onClick={() => showDescription(props.vacation)}>More info</button>

            </div>
        </div>
    );
}

export default VacationCardAdmin;
