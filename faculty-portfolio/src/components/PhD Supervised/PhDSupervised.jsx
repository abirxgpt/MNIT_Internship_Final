import React, { useEffect, useState } from 'react';
import './PhDSupervised.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

const PhDSupervised = () => {
  const [phdList, setPhdList] = useState([]);

  useEffect(() => {
    const fetchPhDData = async () => {
      try {
        const response = await fetch('https://faculty-backend-koz0.onrender.com/api/phd/all');
        const data = await response.json();
        setPhdList(data);
      } catch (error) {
        console.error('Error fetching PhD data:', error);
      }
    };

    fetchPhDData();
  }, []);

  const groupedByStatus = phdList.reduce((acc, phd) => {
    const status = phd.phdStatus || 'Unknown';
    acc[status] = acc[status] || [];
    acc[status].push(phd);
    return acc;
  }, {});

  const completedList = phdList.filter(phd => phd.phdStatus === 'Completed');
  const ongoingList = phdList.filter(phd => phd.phdStatus === 'Ongoing');

  return (
    <>
      <Navbar />
      <div className="phd-supervised-page">
        <h1>PhD Supervised</h1>

        <Dropdown title="Completed">
          {completedList.length === 0 ? (
            <p>No PhD supervision records found.</p>
          ) : (
            <div className="phd-cards-container">
              {completedList.map((phd, index) => (
                <div key={index} className="phd-card">
                  <h3>{phd.scholarName}</h3>
                  <p><strong>Topic:</strong> {phd.researchTopicTitle}</p>
                  <p><strong>Year:</strong> {phd.year}</p>
                  {phd.coSupervisor && <p><strong>Co-Supervisor:</strong> {phd.coSupervisor}</p>}
                  {phd.organization && <p><strong>Organization:</strong> {phd.organization}</p>}
                </div>
              ))}
            </div>
          )}
        </Dropdown>

        <Dropdown title="Ongoing">
          {ongoingList.length === 0 ? (
            <p>No PhD supervision records found.</p>
          ) : (
            <div className="phd-cards-container">
              {ongoingList.map((phd, index) => (
                <div key={index} className="phd-card">
                  <h3>{phd.scholarName}</h3>
                  <p><strong>Topic:</strong> {phd.researchTopicTitle}</p>
                  <p><strong>Year:</strong> {phd.year}</p>
                  {phd.coSupervisor && <p><strong>Co-Supervisor:</strong> {phd.coSupervisor}</p>}
                  {phd.organization && <p><strong>Organization:</strong> {phd.organization}</p>}
                </div>
              ))}
            </div>
          )}
        </Dropdown>
      </div>
    </>
  );
};

export default PhDSupervised;
