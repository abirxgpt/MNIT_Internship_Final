import './AdminLogin.css';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AdminLogin() {
  const [adminId, setAdminId] = useState('');
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
      if (adminId === dummyId && password === dummyPass) {
        localStorage.setItem("authToken", "dummyAdminToken");
        localStorage.setItem("role", "admin");
        window.location.href = "/home";
      } else {
        setError("Invalid Admin ID or Password");
        setLoading(false);
      }
    }, 1500);
  };


  return (
    <>
      <Navbar />
      <div>
        <h1>Admin Login</h1>
      </div>
      <div className="loginBox">
        <label htmlFor="adminid">Admin_ID</label>
        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
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

export default AdminLogin;
