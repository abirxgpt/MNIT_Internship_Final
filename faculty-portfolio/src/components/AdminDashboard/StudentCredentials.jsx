import './StudentCredentials.css';
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const StudentCredentials = ({ name, userId, password, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`User ID: ${userId}\nPassword: ${password}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="student-credentials-modal">
            <div className="modal-content">
                <h2>Student Approved ✅</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>User ID (Roll No):</strong> {userId}</p>
                <p><strong>Temporary Password:</strong> {password}</p>

                <p className="cred-para">
                    These credentials have also been emailed to the student.
                </p>

                <button onClick={handleCopy} className="copy-btn">
                    <FaCopy className="copy-icon" style={{ marginRight: '8px' }} />
                    {copied ? "Copied!" : "Copy Credentials"}
                </button>
                <br />
                <div className="center-btn">
                    <button onClick={onClose} className="close-btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default StudentCredentials;
