import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import TripMap from './TripMap';
import './Trips.css';

function Trips() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/trips/all`);
                const data = await res.json();
                setTrips(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTrips();
    }, []);

    return (
        <>
            <Navbar />
            <div className="tripListBox">
                <h1>Trips & Travels</h1>
                <TripMap trips={trips} />
                <div className="trip-cards">
                    {trips.map((trip, index) => (
                        <div key={index} className="trip-card">
                            {trip.photoUrl && <img src={trip.photoUrl} alt="trip" className="trip-img" />}
                            <div className="trip-info">
                                <h3>{trip.location}</h3>
                                <p><strong>Year:</strong> {trip.year}</p>
                                <p><strong>Purpose:</strong> {trip.purpose}</p>
                                {trip.description && <p className="trip-description">{trip.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Trips;
