import React, { useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

function Home(): JSX.Element {
    const [isLoaded, setIsLoaded] = useState(true); 

    return (
        <div className="Home">
            {!isLoaded && <div className="loading">Loading...</div>}
            
            <h1>Explore Israel with Daniel!<br></br>
            </h1>
            <br /><br />
            <p> Dive into the vivid tapestry of Israel, 
                where ancient whispers greet modern vibrancy. 
                Stroll through Jerusalem's cobbled lanes, touching history, 
                then let Tel Aviv's sun-kissed beaches and pulsating nightlife
                sweep you off your feet. Float effortlessly in the Dead Sea, 
                trek the rugged terrains of the Negev, and immerse yourself in
                the underwater ballet of Eilat's coral reefs. From the echoing 
                calls of bazaars to the tantalizing aroma of street foods and the rhythmic
                beats of desert festivals, Israel is an intoxicating dance of experiences waiting 
                to bewitch every wandering soul. Embrace the adventure, and let Israel's 
                wonders enrapture you!
            <br /><br /><br />
                <NavLink to="/register" className="Link">Sign up</NavLink>
            </p>
        </div>
    );
}

export default Home;
