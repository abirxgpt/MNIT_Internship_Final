import { useEffect, useState } from 'react';
import './Achievements.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

function Achievements() {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch('https://faculty-backend-koz0.onrender.com/api/achievements/all');
                const data = await response.json();
                setAchievements(data);
            } catch (err) {
                console.error('Failed to fetch achievements:', err);
            }
        };

        fetchAchievements();
    }, []);

    const filterByType = (type) =>
        achievements.filter((item) => item.type === type);

    return (
        <>
            <Navbar />
            <div className="achievementBox">
                <h1>Achievements</h1>
                <div className="achievements">
                    <div className="award">
                        <Dropdown title="Awards and Honours" className="dropdown-award">
                            {filterByType("Award").length > 0 ? (
                                filterByType("Award")
                                    .sort((a, b) => b.year - a.year)
                                    .map((item, index) => (
                                        <p key={index}>
                                            {item.description} – {item.year}
                                        </p>
                                    ))
                            ) : (
                                <p className="no-records">No records found.</p>
                            )}
                        </Dropdown>
                    </div>
                    <div className="patent">
                        <Dropdown title="Patents" className="dropdown-patent">
                            {filterByType("Patent").length > 0 ? (
                                filterByType("Patent").map((item, index) => (
                                    <p key={index}>
                                        <strong>"{item.title}"</strong>, {item.authors} Reg.No. {item.patentNumber} [{item.grantedBy}] Dt. {item.date}
                                    </p>
                                ))
                            ) : (
                                <p className="no-records">No records found.</p>
                            )}
                        </Dropdown>
                    </div>


                    <div className="affiliation">
                        <Dropdown title="Professional Affiliations" className="dropdown-affiliation">
                            {filterByType("Affiliation").length > 0 ? (
                                filterByType("Affiliation").map((item, index) => (
                                    <p key={index}>
                                        {item.description}
                                    </p>
                                ))
                            ) : (
                                <p className="no-records">No records found.</p>
                            )}
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Achievements;
