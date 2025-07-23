import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './components/Login/Login.jsx';
import ChangePassword from './components/Login/ChangePassword.jsx';
import HomePage from './components/Home/Home.jsx'
import PublicationPage from './components/Publications/Publications.jsx'
import AddPublication from './components/Publications/AddPublication.jsx';
import CoursesPage from './components/Courses/Courses.jsx'
import AddCourse from './components/Courses/AddCourse.jsx';
import Resources from './components/Resources/Resources.jsx';
import AddResource from './components/Resources/AddResource.jsx';
import Projects from "./components/Projects/Projects.jsx";
import AddProjects from "./components/Projects/AddProject.jsx";
import Events from './components/Events/Events.jsx';
import Students from "./components/Students/Students.jsx";
import EditProfile from './components/EditProfile/EditProfile.jsx';
import AccessDenied from "./components/AccessDenied/AccessDenied.jsx";
import SyllabusView from './components/Courses/SyllabusView';
import AddLecturePlan from './components/Courses/AddLecturePlan.jsx';
import Gallery from './components/Gallery/Gallery';
import AddTrip from './components/Trips/AddTrip';
import Trips from './components/Trips/Trips';
import Achievements from './components/Achievements/Achievements.jsx';
import AddAchievement from './components/Achievements/AddAchievement.jsx';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

import './index.css'

const redirect = new URLSearchParams(window.location.search).get("redirect");
if (redirect) {
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/MNIT_Internship">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/publications" element={<PublicationPage />} />
        <Route path="/add-publication" element={<AddPublication />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/syllabus/:courseId/:year" element={<SyllabusView />} />
        <Route path="/add-lecture-plan" element={<AddLecturePlan />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/add-projects" element={<AddProjects />} />
        <Route path="/events" element={<Events />} />
        <Route path="/students" element={<Students />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/add-achievement" element={<AddAchievement />} />

        {/* ✅ Protected: only student and admin */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <Resources />
            </ProtectedRoute>
          }
        />

        {/* Add this new route below for AddResource, admin only */}
        <Route
          path="/add-resource"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddResource />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected: only admin */}
        <Route
          path="/editProfile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>

      {/* ✅ Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      // toastClassName="custom-toast"
      />
    </BrowserRouter>
  </StrictMode>,
);
