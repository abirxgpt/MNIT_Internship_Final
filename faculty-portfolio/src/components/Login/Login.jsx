import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
    const [role, setRole] = useState("student"); // "student", "admin", or "register"
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [regForm, setRegForm] = useState({
        name: "",
        rollNumber: "",
        email: "",
        phone: "",
        department: ""
    });
    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect");
    const roleFromURL = searchParams.get("role");

    useEffect(() => {
        if (roleFromURL) {
            setRole(roleFromURL);
        }
    }, [roleFromURL]);

    const handleLogin = async () => {
        setIsLoggingIn(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    userId,
                    password,
                    role
                })
            });

            if (!response.ok) {
                throw new Error("Invalid User ID, Password or Role");
            }

            const data = await response.json();
            localStorage.setItem("role", role);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("userId", userId);
            localStorage.setItem("firstLogin", data.firstLogin);

            setIsLoggingIn(false);
            toast.success("Login successful!");

            if (role === "student" && data.firstLogin) {
                navigate("/change-password");
            } else {
                navigate(redirectPath || "/home");
            }

        } catch (err) {
            setIsLoggingIn(false);
            toast.error(`${err.message}`);
        }
    };

    const handleRegister = async () => {
        setIsRegistering(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/newstudents/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(regForm)
            });

            if (!response.ok) {
                throw new Error("Failed to register student.");
            }

            toast.success("Registration request sent to admin!");
            setRegForm({ name: "", rollNumber: "", email: "", phone: "", department: "" });
            setRole("student"); // Switch back to login
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="loginBox">
            <div className="login">
                <h1>{role === "register" ? "Student Registration" : "Login"}</h1>
            </div>

            {/* Toggle Buttons */}
            <select value={role} onChange={(e) => setRole(e.target.value)} className="role-dropdown">
                <option value="student">Login as Student</option>
                <option value="admin">Login as Admin</option>
                <option value="register">Register as New Student</option>
            </select>

            {role === "student" || role === "admin" ? (
                <>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="button" onClick={handleLogin} disabled={isLoggingIn}>
                        {isLoggingIn ? <div className="spinner"></div> : "Login"}
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Name"
                        value={regForm.name}
                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Roll Number"
                        value={regForm.rollNumber}
                        onChange={(e) => setRegForm({ ...regForm, rollNumber: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={regForm.department}
                        onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                    />
                    <button className="button" onClick={handleRegister} disabled={isRegistering}>
                        {isRegistering ? <div className="spinner"></div> : "Submit"}
                    </button>
                </>
            )}
        </div>
    );
};

export default Login;
