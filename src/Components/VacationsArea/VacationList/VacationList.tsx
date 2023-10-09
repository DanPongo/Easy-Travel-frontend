import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import "./VacationList.css";
import swal from "sweetalert";
import UserModel from "../../../Models/UserModel";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { authStore } from "../../../Redux/AuthState";
import VacationCardUser from "../VacationCardUser/VacationCardUser";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";

function VacationList(): JSX.Element {
    useVerifyLoggedIn();

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [showFollowed, setShowFollowed] = useState<boolean>(false);
    const [showOnlyFuture, setShowOnlyFuture] = useState<boolean>(false);
    const [showCurrent, setShowCurrent] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);

    let user: UserModel | null = authStore.getState().user;

    useEffect(() => {
        if (!user || !user.userId) {
            swal({
                title: "Must log in first",
                icon: "error",
            });
            return;
        }
        showVacations();
    }, [showFollowed, showOnlyFuture, showCurrent, user]);

    async function showVacations() {
        try {
            vacationsStore.dispatch({ type: VacationsActionType.EmptyVacations, payload: [] });
            const vacations = await vacationsService.getAllVacationsForUser(user!.userId);

            let filteredVacations = vacations;
            if (showFollowed) filteredVacations = filteredVacations.filter(v => v.isFollow);

            if (showOnlyFuture) {
                const currentDate = new Date();
                filteredVacations = filteredVacations.filter(v => new Date(v.checkIn) >= currentDate);
            }

            if (showCurrent) {
                const currentDate = new Date();
                filteredVacations = filteredVacations.filter(v => new Date(v.checkIn) <= currentDate && new Date(v.checkOut) >= currentDate);
            }

            // Sorting the vacations from oldest to newest based on the checkIn date
            filteredVacations.sort((a, b) => {
                return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
            });

            setVacations(filteredVacations);
        } catch (err: any) {
            swal({
                title: err,
                icon: "error",
            });
        }
    }

    const itemsPerPage = 9;
    const totalItems = vacations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        showVacations();
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = vacations.slice(startIndex, endIndex);

    if (!user) return <div>You must log in first!</div>;

    return (
        <div className="VacationList">
            {user?.roleId === 2 && <>
                <label className="choose">Choose 1 check box or none to see all vacations</label>
                <div className="FollowedVacations">
                    <label htmlFor="FollowedVacations">Favorite Vacations </label>
                    <input type="checkbox" onChange={() => setShowFollowed(!showFollowed)} checked={showFollowed} onClick={() => handlePageChange(1)} />
                </div>
                <div className="FutureVacations">
                    <br />
                    <label htmlFor="FutureVacations">Show only future vacations </label>
                    <input type="checkbox" onChange={() => setShowOnlyFuture(!showOnlyFuture)} checked={showOnlyFuture} onClick={() => handlePageChange(1)} />
                </div>
                <div className="CurrentVacations">
                    <br />
                    <label htmlFor="CurrentVacations">Show only current vacations </label>
                    <input type="checkbox" onChange={() => setShowCurrent(!showCurrent)} checked={showCurrent} onClick={() => handlePageChange(1)} />
                </div>
                <div className="ContainerUser">
                    {currentItems.map((v) =>
                        <div className="UserVacations" key={v.vacationId}>
                            <VacationCardUser vacation={v} updateVacations={() => showVacations()} />
                        </div>
                    )}
                </div>
                <div className="Pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages} </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </>}

            {user?.roleId === 1 && <>
                <div className="ContainerAdmin">
                    {currentItems.map((v) => (
                        <div className="AdminVacations" key={v.vacationId}>
                            <VacationCardAdmin vacation={v} />
                        </div>
                    ))}
                </div>
                <div className="Pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages} </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </>}
        </div>
    );
}

export default VacationList;
    