import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './AdminDashboard.css';
import { toast } from 'react-toastify';
// import StudentCredentials from './StudentCredentials';


const AdminDashboard = () => {
    const [pendingStudents, setPendingStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [approvedStudent, setApprovedStudent] = useState(null);

    const fetchPending = async () => {
        try {
            const res = await fetch('https://faculty-backend-koz0.onrender.com/api/newstudents/pending');
            const data = await res.json();
            setPendingStudents(data);
        } catch (err) {
            toast.error('Failed to fetch pending students');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await fetch(`https://faculty-backend-koz0.onrender.com/api/newstudents/approve/${id}`, {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Approval failed");
                return;
            }

            // setApprovedStudent({
            //     name: data.userName || "Student",
            //     userId: data.userId || "Unknown",
            //     password: data.password
            // });

            toast.success("Student approved ✅");

            // Show toast for email status
            if (data.emailSent) {
                toast.success("Login credentials sent via email 📩");
            } else {
                toast.warn("Student approved, but email failed to send❗");
            }

            fetchPending();
        } catch (err) {
            toast.error('Approval failed');
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await fetch(`https://faculty-backend-koz0.onrender.com/api/newstudents/reject/${id}`, {
                method: 'POST',
            });
            const data = await res.json();
            toast.success(data.message);
            fetchPending();
        } catch (err) {
            toast.error('Rejection failed');
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <>
            <Navbar />
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <section className="pending-section">
                    <h2>Pending Student Registrations</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : pendingStudents.length === 0 ? (
                        <p>No pending requests!</p>
                    ) : (
                        <table className="pending-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStudents.map((student) => (
                                    <tr key={student._id}>
                                        <td data-label="Name">{student.name}</td>
                                        <td data-label="Roll No">{student.rollNumber}</td>
                                        <td data-label="Email">{student.email}</td>
                                        <td data-label="Department">{student.department}</td>
                                        <td data-label="Actions">
                                            <button onClick={() => handleApprove(student._id)} className="approve-btn">Approve</button>
                                            <button onClick={() => handleReject(student._id)} className="reject-btn">Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
            {/* {approvedStudent && (
                <StudentCredentials
                    name={approvedStudent.name}
                    userId={approvedStudent.userId}
                    password={approvedStudent.password}
                    onClose={() => setApprovedStudent(null)}
                />
            )} */}
        </>
    );
};

export default AdminDashboard;
