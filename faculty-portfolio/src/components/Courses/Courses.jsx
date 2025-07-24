import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import './Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = !!localStorage.getItem("userId");
  const role = localStorage.getItem('role');
  const canAccessClassroom = (role === 'student' || role === 'admin') && isLoggedIn;
  const [expandedCourseName, setExpandedCourseName] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/courses/all');
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Separate courses by type
  const currentlyTeaching = courses.filter(c => c.courseType === 'Currently Teaching');
  const previouslyTaught = courses.filter(c => c.courseType === 'Previously Taught');

  // const renderYearsTaught = (course) => {
  //   if (!course.yearsTaught || course.yearsTaught.length === 0) {
  //     return <p>No year-wise info available.</p>;
  //   }

  //   return course.yearsTaught
  //     .filter(entry => entry && entry.year && entry.session)
  //     .map((entry, idx) => (
  //       <div key={idx} className="course-year-entry" style={{ marginBottom: '6px' }}>
  //         <Link
  //           to={`/syllabus/${course.courseId}/${entry.year}`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           style={{ fontWeight: 'bold', color: 'rgb(101, 101, 255)', textDecoration: 'underline' }}
  //         >
  //           {entry.year} ({entry.session})
  //         </Link>

  //         {entry.classroomLink && (
  //           canAccessClassroom ? (
  //             <a
  //               href={entry.classroomLink}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               style={{
  //                 marginLeft: '10px',
  //                 color: 'rgb(101, 101, 255)',
  //                 fontWeight: 'bold',
  //                 textDecoration: 'underline'
  //               }}
  //             >
  //               Classroom
  //             </a>
  //           ) : (
  //             <Link
  //               to="/login"
  //               style={{
  //                 marginLeft: '10px',
  //                 color: 'rgb(101, 101, 255)',
  //                 fontWeight: 'bold',
  //                 textDecoration: 'underline'
  //               }}
  //             >
  //               Classroom
  //             </Link>
  //           )
  //         )}
  //       </div>
  //     ));
  // };
  const renderYearsTaught = (course) => {
    if (!course.yearsTaught || course.yearsTaught.length === 0) {
      return <p>No year-wise info available.</p>;
    }

    return (
      <div className="table-scroll-wrapper">
        <table className="teaching-table">
          <thead>
            <tr>
              <th>Year (Session)</th>
              <th>Classroom</th>
            </tr>
          </thead>
          <tbody>
            {course.yearsTaught
              .filter(entry => entry && entry.year && entry.session)
              .map((entry, idx) => (
                <tr key={idx}>
                  <td>
                    <Link
                      to={`/syllabus/${course.courseId}/${entry.year}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {entry.year} ({entry.session})
                    </Link>
                  </td>
                  <td>
                    {entry.classroomLink ? (
                      canAccessClassroom ? (
                        <a
                          href={entry.classroomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Classroom
                        </a>
                      ) : (
                        <Link to="/login">Classroom</Link>
                      )
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <>
      <Navbar />
      <div className="coursesBox">
        <h1>Courses Taught</h1>

        {/* {loading && <p>Loading courses...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>} */}

        {!loading && !error && (
          <div className="courses">
            <div className="latest">
              <Dropdown title="Currently Teaching" className="dropdown-currently">
                {currentlyTeaching.length > 0 ? (
                  currentlyTeaching.map(course => (
                    <div key={course.courseId} className="course-item">
                      <div
                        className="course-link"
                        style={{ cursor: 'pointer', marginBottom: '7px' }}
                        onClick={() =>
                          setExpandedCourseName(
                            expandedCourseName === course.courseName ? null : course.courseName
                          )
                        }
                      >
                        {`${course.courseId}: ${course.courseName} (${course.institute})`}
                        {expandedCourseName === course.courseName && (
                          <div className="course-details-inline" style={{ marginLeft: '20px', marginTop: '8px' }}>
                            {renderYearsTaught(course)}
                          </div>
                        )}

                      </div>
                    </div>
                  ))
                ) : (
                  <p>No record found.</p>
                )}
              </Dropdown>
            </div>

            <div className="till_date">
              <Dropdown title="Previously Taught" className="dropdown-previously">
                {previouslyTaught.length > 0 ? (
                  previouslyTaught.map(course => (
                    <div key={course.courseId} className="course-item">
                      <div
                        className="course-link"
                        style={{ cursor: 'pointer', marginBottom: '5px' }}
                        onClick={() =>
                          setExpandedCourseName(
                            expandedCourseName === course.courseName ? null : course.courseName
                          )
                        }
                      >
                        {`${course.courseId}: ${course.courseName} (${course.institute})`}
                        {expandedCourseName === course.courseName && (
                          <div className="course-details-inline" style={{ marginLeft: '20px', marginTop: '8px' }}>
                            {renderYearsTaught(course)}
                          </div>
                        )}
                      </div>
                    </div>

                  ))
                ) : (
                  <p>No record found.</p>
                )}
              </Dropdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Courses;
