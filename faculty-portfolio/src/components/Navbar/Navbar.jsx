import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.png';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const isStudentOrAdmin = role === "student" || role === "admin";
    const [visibleTabs, setVisibleTabs] = useState({
        home: true,
        publications: true,
        courses: true,
        projects: true,
        events: true,
        gallery: true,
        trips: true,
        students: true,
        resources: true,
        achievements: true,
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("role");
        setIsLoggedIn(!!storedUserId);
        setRole(storedRole);

        const fetchVisibleTabs = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tab-visibility/all`);
                const data = await res.json();
                const formatted = {};
                data.forEach(item => {
                    formatted[item.fieldName] = item.enabled;
                });
                setVisibleTabs(formatted);
            } catch (err) {
                console.error("Failed to fetch tab visibility", err);
            }
        };

        if (storedRole === "student") {
            fetchVisibleTabs();
        }
    }, []);

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (!e.target.closest('.admin-profile-dropdown')) {
    //             setMenuOpen(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.removeItem("userName");
            setIsLoggedIn(false);
            setRole(null);
            navigate("/");
            setIsLoggingOut(false);
        }, 1000);
    };

    const shouldShow = (tabName) => {
        return role !== "student" || visibleTabs?.[tabName.toLowerCase()];
    };

    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
                    {shouldShow("Home") && <li onClick={() => setMenuOpen(false)}><Link to="/home">Home</Link></li>}
                    {shouldShow("Publications") && <li><Link to="/publications">Publications</Link></li>}
                    {shouldShow("Courses") && <li><Link to="/courses">Courses</Link></li>}
                    {shouldShow("Projects") && <li><Link to="/projects">Projects</Link></li>}
                    {shouldShow("Events") && <li><Link to="/events">Events</Link></li>}
                    {shouldShow("Students") && <li><Link to="/students">Students</Link></li>}
                    {shouldShow("Resources") && isLoggedIn && isStudentOrAdmin && <li><Link to="/resources">Resources</Link></li>}
                    {/* {isLoggedIn && role === "admin" && <li><Link to="/editProfile">Edit Profile</Link></li>} */}
                    {(shouldShow("Gallery") || shouldShow("Trips") || shouldShow("Achievements")) && (
                        <li className="explore">
                            <span className="explorebtn">Explore ▾</span>
                            <div className="explore-content">
                                {shouldShow("Gallery") && <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>}
                                {shouldShow("Trips") && <Link to="/trips" onClick={() => setMenuOpen(false)}>Trips & Travels</Link>}
                                {shouldShow("Achievements") && <Link to="/achievements" onClick={() => setMenuOpen(false)}>Achievements</Link>}
                            </div>
                        </li>
                    )}

                    {/* Show login if not logged in */}
                    {!isLoggedIn && (
                        <li>
                            <button className="logoutbtn" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </li>
                    )}

                    {/* Show logout if logged in */}
                    {isLoggedIn && role === "student" && (
                        <li>
                            <button className="logoutbtn" onClick={handleLogout} disabled={isLoggingOut}>
                                {isLoggingOut ? <div className="spinner"></div> : "Logout"}
                            </button>
                        </li>
                    )}

                    {isLoggedIn && role === "admin" && (
                        <li className="admin-profile-dropdown hover-trigger">
                            <div className="profile-icon">👤</div>
                            <div className="dropdown-menu">
                                <Link to="/editProfile">Dashboard</Link>
                                {/* <Link to="/admin-dashboard">Dashboard</Link> */}
                                <button onClick={handleLogout} disabled={isLoggingOut}>
                                    {isLoggingOut ? <div className="spinner"></div> : "Logout"}
                                </button>
                            </div>
                        </li>
                    )}
                    
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
