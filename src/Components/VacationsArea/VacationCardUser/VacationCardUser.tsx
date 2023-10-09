import React, { useState } from "react";
import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import followersService from "../../../Services/FollowersService";
import appConfig from "../../../Utils/Config";
import "./VacationCardUser.css";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface VacationCardProps {
    vacation: VacationModel;
    updateVacations: () => void;
}

function VacationCardUser(props: VacationCardProps): JSX.Element {
    const [followers, setFollowers] = useState(props.vacation.followersAmount);
    const [isFollowing, setIsFollowing] = useState(props.vacation.isFollow === 1);

    const { updateVacations } = props;

    async function isFollow() {
        try {
            const vacationId = props.vacation.vacationId;
            const userId = await authService.getUserIdFromToken();

            const follower = new FollowerModel();
            follower.vacationId = vacationId;
            follower.userId = userId;

            if (isFollowing) {
                setIsFollowing(false);
                setFollowers(followers - 1);
                await followersService.deleteFollower(follower);
            } else {
                setIsFollowing(true);
                setFollowers(followers + 1);
                await followersService.addFollower(follower);
            }
            updateVacations();
        } catch (err: any) {
            console.error(err);
        }
    }

    function showDescription(vacation: VacationModel) {
        const modal = document.getElementById("descriptionModal");
        modal!.style.display = "flex";
    }

    function closeModal() {
        const modal = document.getElementById("descriptionModal");
        modal!.style.display = "none";
    }

    return (
        <div className="VacationCardUser">
            <div className="Card">
                <label className="ContainerBox">
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={isFollowing}
                        onClick={() => { isFollow() }}
                    />
                </label>
                <span> {followers} </span>
                <img crossOrigin="anonymous" src={appConfig.vacationsImageUrl + props.vacation.imageName} />
                <br />
                <p className="Destination">{props.vacation.destination}</p>
                <p>Check In: {props.vacation.checkIn}</p>
                <p>Check Out: {props.vacation.checkOut}</p>
                <p>Price: {props.vacation.price}$</p><br />
                <button className="Description" id="card-button" onClick={() => showDescription(props.vacation)}>More info</button>
            </div>
            <div id="descriptionModal" className="modal">
                <div className="modal-content">
                    {props.vacation.description}
                    <br/><br/>
                    Email for Booking: daniel.h12377@gmail.com
                    <br/> 
                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="email-link">
                     <span className="email-emoji">📧</span> Connect to Gmail
                    </a>
                    <button className="modal-button" onClick={closeModal}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default VacationCardUser;
