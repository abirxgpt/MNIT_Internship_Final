import React, { useEffect, useState } from 'react';
import './Projects.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://faculty-backend-koz0.onrender.com/api/projects/all');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const filterByStatus = (status) =>
    projects.filter((proj) => proj.status?.toLowerCase() === status.toLowerCase());

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };
  return (
    <>
      <Navbar />
      <div className="projectsBox">
        <h1>Projects</h1>
        <div className="projects">
          <Dropdown title="Ongoing" className="dropdown-ongoing">
            {filterByStatus("Ongoing").length > 0 ? (
              filterByStatus("Ongoing").map((project, index) => (
                <div className="ongoing project-entry" key={index}>
                  <p>
                    <strong>{project.projectTitle}</strong>, {project.projectType}, {project.projectLevel}
                    <br />
                    <em>{project.yearFrom} - {project.yearTo || 'Present'}</em>
                  </p>
                  <p>
                    <strong>Role:</strong> {project.role} | <strong>Funding Agency:</strong> {project.fundingAgency}
                  </p>
                  <p>
                    <strong>Amount:</strong> Rs. {project.amount} Lacs 
                    {/* | <strong>ERP ID:</strong> {project.erpId} */}
                  </p>
                  {project.coInvestigators?.length > 0 && (
                    <p><strong>Co-Investigators:</strong> {project.coInvestigators.join(', ')}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="no-project-records">No records found.</p>
            )}
          </Dropdown>

          <Dropdown title="Completed" className="dropdown-completed">
            {filterByStatus("Completed").length > 0 ? (
              filterByStatus("Completed").map((project, index) => (
                <div className="completed project-entry" key={index}>
                  <p>
                    <strong>{project.projectTitle}</strong>, {project.projectType}, {project.projectLevel}
                    <br />
                    <em>{project.yearFrom} - {project.yearTo || 'Present'}</em>
                  </p>
                  <p>
                    <strong>Role:</strong> {project.role} | <strong>Funding Agency:</strong> {project.fundingAgency}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{project.amount} Lacs 
                    {/* | <strong>ERP ID:</strong> {project.erpId} */}
                  </p>
                  {project.coInvestigators?.length > 0 && (
                    <p><strong>Co-Investigators:</strong> {project.coInvestigators.join(', ')}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="no-project-records">No records found.</p>
            )}
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default Projects;