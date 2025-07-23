import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import './EditProfile.css';
import Navbar from '../Navbar/Navbar';
import AddPublicationForm from '../Publications/AddPublication';
import AddCourseForm from '../Courses/AddCourse';
import AddProjectForm from '../Projects/AddProject';
import AddEventForm from '../Events/AddEvent';
import AddStudentForm from '../Students/AddStudent';
import AddResourceForm from '../Resources/AddResource';
import AddLecturePlan from '../Courses/AddLecturePlan';
import AddGalleryForm from '../Gallery/AddGallery';
import AddTripForm from '../Trips/AddTrip';
import AddAchievement from '../Achievements/AddAchievement';

function EditProfile() {
  const [section, setSection] = useState('');
  const [subField, setSubField] = useState('');
  const [info, setInfo] = useState('');
  const [tabVisibility, setTabVisibility] = useState({});
  const [pendingStudents, setPendingStudents] = useState([]);
  // const [approvedStudent, setApprovedStudent] = useState(null);

  // Profile fields state
  const [profile, setProfile] = useState({
    name: '',
    contactNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  // const [message, setMessage] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);

  const subOptions = {
    home: ['about', 'news', 'changePhoto', 'cv'],
    publications: ['addPublication'],
    // publications: ['add', 'update', 'remove'],
    courses: ['addCourse', 'addLecturePlan'],
    resources: ['addResource'],
    projects: ['addProject'],
    events: ['addEvent'],
    students: ['addStudentSupervised'],
    gallery: ['addGallery'],
    trips: ['addTrip'],
    achievements: ['addAchievement'],
  };

  const getSubFieldLabel = (value) => {
    const labels = {
      about: 'About Me',
      news: 'News',
      changePhoto: 'Change Profile Photo',
      cv: 'Upload Detailed CV',
      addPublication: 'Add Publication',
      addCourse: 'Add Course',
      addLecturePlan: 'Add Lecture Plan to Existing Course',
      addResource: 'Add Resource',
      addProject: 'Add Project',
      addEvent: 'Add Event',
      addStudentSupervised: 'Add Student Supervised',
      addGallery: 'Add Gallery Item',
      addTrip: 'Add Trip Location',
      addAchievement: 'Add Achievement',
    };
    return labels[value] || '';
  };

  const fetchTabVisibility = async () => {
    const defaultTabs = {
      home: true,
      publications: true,
      courses: true,
      projects: true,
      events: true,
      students: true,
      trips: true,
      gallery: true,
      resources: true,
      achievements: true,
    };
    try {
      const res = await fetch('https://faculty-backend-koz0.onrender.com/api/tab-visibility/all');
      const responseData = await res.json();

      const updatedTabs = responseData.reduce((acc, item) => {
        acc[item.fieldName.toLowerCase()] = item.enabled;
        return acc;
      }, {});

      const finalTabs = Object.keys(defaultTabs).reduce((acc, key) => {
        acc[key] = updatedTabs[key] ?? true;
        return acc;
      }, {});

      setTabVisibility(finalTabs);
    } catch (err) {
      console.error("Error fetching tabs", err);
      setTabVisibility(defaultTabs);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://faculty-backend-koz0.onrender.com/api/profile');
        const data = await res.json();
        setProfile({
          name: data.name || '',
          contactNumber: data.contactNumber || '',
          email: data.email || '',
          role: data.role || '',
        });
        if (subField) setInfo(data[subField] || '');
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchTabVisibility();

  }, [subField]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!section || !subField) {
      toast.warn('Please choose both section and sub-field');
      return;
    }
    if (
      !(
        section === 'publications' ||
        section === 'courses' ||
        section === 'resources'
      )
    ) {
      // Update simple text content like name, email, about, etc.
      const payload = {
        ...profile,
        [subField]: info,
      };

      // console.log('📦 Payload being sent to backend:', payload);

      try {
        const res = await fetch('https://faculty-backend-koz0.onrender.com/api/profile/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Update failed');
        // setMessage(`✅ ${getSubFieldLabel(subField)} updated!`);
        toast.success(`${getSubFieldLabel(subField)} updated!`)
      } catch (err) {
        // setMessage(`❌ Error: ${err.message}`);
        toast.error(`Error: ${err.message}`)
      }
    }
  };

  const handlePhotoUpdate = async () => {
    if (!selectedPhoto) {
      toast.warn('Please select a photo to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedPhoto);

    try {
      const res = await fetch('https://faculty-backend-koz0.onrender.com/api/profile/photo', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      toast.success('Profile photo uploaded!');
      console.log("🌐 Cloudinary URL:", data.image);
    } catch (err) {
      toast.error('Error uploading photo');
      console.error(err);
    }
  };

  const handleCVUpload = async () => {
    if (!selectedCV) {
      toast.warn('Please select a PDF to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', selectedCV);

    try {
      const res = await fetch('https://faculty-backend-koz0.onrender.com/api/profile/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('CV upload failed');

      toast.success('Detailed CV uploaded successfully!');
      setSelectedCV(null);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleTabVisibilityUpdate = async () => {
    try {
      const payload = Object.entries(tabVisibility).map(([fieldName, enabled]) => ({
        fieldName,
        enabled,
      }));
      const res = await fetch('https://faculty-backend-koz0.onrender.com/api/tab-visibility/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Update failed');
      await fetchTabVisibility();
      toast.success('Tab visibility updated successfully!');
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

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
      <div className="edit-profile-wrapper">
        <h1 className="headingEdit">Edit Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="edit-profile-box">
            <div className="row">
              <div className="input-group">
                <label>Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter name"
                  disabled
                // style={{ cursor: 'not-allowed' }}
                />
              </div>
              <div className="input-group">
                <label>Contact No</label>
                <input
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter contact number"
                  disabled
                // style={{ cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Email ID</label>
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="tab-visibility-control">
              <label className="subheading">Control Tab Visibility for Students</label>
              <div className="checkbox-grid">
                {["Home", "Publications", "Courses", "Projects", "Events", "Gallery", "Trips", "Students", "Achievements", "Resources"].map(tab => (
                  <div key={tab} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`tab-${tab}`}
                      checked={tabVisibility[tab.toLowerCase()] ?? true}
                      onChange={(e) =>
                        setTabVisibility({
                          ...tabVisibility,
                          [tab.toLowerCase()]: e.target.checked
                        })
                      }
                    />
                    <label htmlFor={`tab-${tab}`}>{tab}</label>
                  </div>
                ))}
              </div>
              <button className="visibility-button" onClick={handleTabVisibilityUpdate}>
                Save Tab Visibility
              </button>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Main Section</label>
                <select
                  value={section}
                  onChange={(e) => {
                    setSection(e.target.value);
                    setSubField('');
                  }}
                >
                  <option value="">--Choose--</option>
                  <option value="home">Home</option>
                  <option value="publications">Publications</option>
                  <option value="courses">Courses</option>
                  <option value="projects">Projects</option>
                  <option value="events">Events</option>
                  <option value="gallery">Gallery</option>
                  <option value="trips">Trips and Travels</option>
                  <option value="students">Student Supervised</option>
                  <option value="resources">Resources</option>
                  <option value="achievements">Achievements</option>
                </select>
              </div>
            </div>

            {section && subOptions[section] && (
              <div className="row">
                <div className="input-group">
                  <label>Sub-Field</label>
                  <select
                    value={subField}
                    onChange={(e) => setSubField(e.target.value)}
                  >
                    <option value="">--Select Sub-Field--</option>
                    {subOptions[section].map((item) => (
                      <option key={item} value={item}>
                        {getSubFieldLabel(item)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {section === 'home' && (subField === 'about' || subField === 'news') && (
              <div className="row">
                <div className="input-group">
                  <textarea
                    rows="7"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder={
                      subField
                        ? `Add information for ${getSubFieldLabel(subField)}`
                        : 'Add Information'
                    }
                  />
                </div>
              </div>
            )}

            {section === 'home' && subField === 'changePhoto' && (
              <div className="row">
                <div className="input-group">
                  <label>Upload New Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
            )}

            {section === 'home' && subField === 'cv' && (
              <div className="row">
                <div className="input-group">
                  <label>Upload Detailed CV (PDF)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSelectedPhoto(e.target.files[0])} // We'll rename this in a sec
                  />
                </div>
              </div>
            )}

            {section === 'home' && subField === 'changePhoto' && (
              <div className="row">
                <button className="update-photo-button" onClick={handlePhotoUpdate}>
                  Upload Photo
                </button>
              </div>
            )}

            {section === 'home' && subField === 'cv' && (
              <div className="row">
                <button className="update-button" onClick={handleCVUpload}>
                  Upload CV
                </button>
              </div>
            )}


            {section === 'publications' && subField === 'addPublication' && (
              <div className="row">
                <AddPublicationForm />
              </div>
            )}

            {section === 'courses' && subField === 'addCourse' && (
              <div className="row">
                <AddCourseForm />
              </div>
            )}

            {section === 'courses' && subField === 'addLecturePlan' && (
              <div className="row">
                <AddLecturePlan />
              </div>
            )}

            {section === 'projects' && subField === 'addProject' && (
              <div className="row">
                <AddProjectForm />
              </div>
            )}

            {section === 'events' && subField === 'addEvent' && (
              <div className="row">
                <AddEventForm />
              </div>
            )}

            {section === 'gallery' && subField === 'addGallery' && (
              <div className="row">
                <AddGalleryForm />
              </div>
            )}

            {section === 'trips' && subField === 'addTrip' && (
              <div className="row">
                <AddTripForm />
              </div>
            )}

            {section === 'students' && subField === 'addStudentSupervised' && (
              <div className="row">
                <AddStudentForm />
              </div>
            )}

            {section === 'resources' && subField === 'addResource' && (
              <div className="row">
                <AddResourceForm />
              </div>
            )}

            {section === 'achievements' && subField === 'addAchievement' && (
              <div className="row">
                <AddAchievement />
              </div>
            )}

            {section === 'home' && subField !== 'changePhoto' && subField !== 'cv' && (
              <div className="row">
                <button className="update-button" onClick={handleUpdate}>
                  Update Profile
                </button>
              </div>
            )}
            {/* {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>} */}
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile;
