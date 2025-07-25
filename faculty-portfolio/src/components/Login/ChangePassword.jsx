// ChangePassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Already stored during login

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.warn("Please fill in all fields");
      return;
    }

    setIsUpdating(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, oldPassword, newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Password changed successfully! 🎉");
      localStorage.setItem("firstLogin", false);
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Your Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="button" onClick={handleChangePassword} disabled={isUpdating}>
        {isUpdating ? <div className="spinner"></div> : "Update Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
