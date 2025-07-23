import { useEffect, useState } from 'react';
import './TripTimeline.css';

function TripTimeline() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch('https://faculty-backend-koz0.onrender.com/api/trips/all')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(console.error);
  }, []);

  // Sort trips by year
  const sortedTrips = [...trips].sort((a, b) => b.year - a.year);

  return (
    <div className="timeline-wrapper">
      <h2>Trip Timeline</h2>
      <div className="timeline">
        {sortedTrips.map((trip, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{trip.year} - {trip.location}</h3>
              <p><strong>Purpose:</strong> {trip.purpose}</p>
              {trip.description && <p>{trip.description}</p>}
              {trip.photoUrl && <img src={trip.photoUrl} alt="trip" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripTimeline;
