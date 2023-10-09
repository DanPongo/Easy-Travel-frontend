import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import FollowersGraph from "../../VacationsArea/Graph/Graph";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/vacations" element={<VacationList />} />
                <Route path="/add-vacation" element={<AddVacation />} />
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
                <Route path="/vacations/graph" element={<FollowersGraph />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
