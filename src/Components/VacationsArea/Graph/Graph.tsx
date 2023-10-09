import React, { useRef, useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import './Graph.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function FollowersGraph() {
    useVerifyLoggedIn();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const downloadRef = useRef(null);

    useEffect(() => {
        vacationsService
            .getAllVacationsForAdmin()
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }
        }
    };

    const data = {
        labels: vacations.map(v => v.destination),
        datasets: [
            {
                data: vacations.map((v: VacationModel) => v.followersAmount),
                backgroundColor: "blue",
            },
        ]
    };

    const downloadCSV = () => {
        if (downloadRef.current) {
            const header = 'Vacations, Likes\n';
            const data = vacations.map(v => `${v.destination}, ${v.followersAmount}`).join('\n');
            const csvData = header + data;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            (downloadRef.current as HTMLAnchorElement).setAttribute('href', url);
            (downloadRef.current as HTMLAnchorElement).setAttribute('download', 'vacations.csv');
            (downloadRef.current as HTMLAnchorElement).click();
        } else {
            console.error("downloadRef is not defined");
        }
    }

    const sendToWhatsApp = () => {
        const message = vacations.map(v => `${v.destination}: ${v.followersAmount} likes`).join('\n');
        const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    }

    return (
        <>
            <Bar options={options} data={data} width="80%" height="32%" />
            <a ref={downloadRef} style={{ display: 'none' }} />
            <button onClick={downloadCSV} className="roundButton">Download CSV</button>
            &nbsp;&nbsp;
            <button onClick={sendToWhatsApp} className="roundButton2">Send CSV to WhatsApp</button>
        </>
    );
}
