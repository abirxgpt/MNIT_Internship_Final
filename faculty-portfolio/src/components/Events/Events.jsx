import { useEffect, useState } from 'react';
import './Events.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/all`);
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            }
        };

        fetchEvents();
    }, []);

    const isUpcoming = (event) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(event.dateFrom);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    };

    const filterByType = (type) => {
        const sorted = [...events].sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
        if (type === 'Upcoming') {
            return sorted.filter(isUpcoming);
        } else if (type === 'Past') {
            return sorted.filter((event) => !isUpcoming(event));
        }
        return [];
    };

    return (
        <>
            <Navbar />
            <div className="eventBox">
                <h1>Events</h1>
                <div className="events">
                    <div className="upcoming">
                        <Dropdown title="Upcoming" className="dropdown-upcoming">
                            {/* {filterByType("Upcoming").length > 0 ? (
                                filterByType("Upcoming").map(renderEvent)
                            ) : (
                                <p className="no-event-records">No records found.</p>
                            )} */}
                            {filterByType("Upcoming").length > 0 ? (
                                <table className="events-table upcoming-table">
                                    <thead>
                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>Title</th>
                                            <th>Location</th>
                                            <th>City</th>
                                            <th>Country</th>
                                            <th>Date</th>
                                            <th>Participation Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByType("Upcoming").map((event, index) => (
                                            <tr key={event._id}>
                                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                <td>{event.eventTitle}</td>
                                                <td style={{ textAlign: "center" }}>{event.institute}</td>
                                                <td style={{ textAlign: "center" }}>{event.city}</td>
                                                <td style={{ textAlign: "center" }}>{event.country}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    {new Date(event.dateFrom).toLocaleDateString()} -{' '}
                                                    {new Date(event.dateTo).toLocaleDateString()}
                                                </td>
                                                <td style={{ textAlign: "center" }}>{event.participationType || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="no-event-records">No records found.</p>
                            )}

                        </Dropdown>
                    </div>
                    <div className="past">
                        <Dropdown title="Past" className="dropdown-past">
                            {filterByType("Past").length > 0 ? (
                                <table className="events-table past-table">
                                    <thead>
                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>Category</th>
                                            <th>Title</th>
                                            <th>Location</th>
                                            <th>City</th>
                                            <th>Country</th>
                                            <th>Date</th>
                                            <th>Participation Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterByType("Past").map((event, index) => (
                                            <tr key={event._id}>
                                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                <td style={{ textAlign: "center" }}>{event.category}</td>
                                                <td>{event.eventTitle}</td>
                                                <td style={{ textAlign: "center" }}>{event.institute}</td>
                                                <td style={{ textAlign: "center" }}>{event.city}</td>
                                                <td style={{ textAlign: "center" }}>{event.country}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    {new Date(event.dateFrom).toLocaleDateString()} - {' '}
                                                    {new Date(event.dateTo).toLocaleDateString()}
                                                </td>
                                                <td style={{ textAlign: "center" }}>{event.participationType || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="no-event-records">No records found.</p>
                            )}

                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;
