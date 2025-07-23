import './StudentLogin.css';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    setLoading(true);

    const dummyId = "123";
    const dummyPass = "123";

    setTimeout(() => {
      if (studentId === dummyId && password === dummyPass) {
        localStorage.setItem("authToken", "dummyStudentToken");
        localStorage.setItem("role", "student");
        window.location.href = "/home";
      } else {
        setError("Invalid Student ID or Password");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <h1>Student Login</h1>
      <div className="loginBox">
        <label htmlFor="studentid">Student_ID</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="logbtn" onClick={handleLogin} disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            "Login"
          )}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default StudentLogin;
