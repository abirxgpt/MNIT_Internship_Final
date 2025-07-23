import { useEffect, useState } from 'react';
import './Publications.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown';

function Publications() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('https://faculty-backend-koz0.onrender.com/api/publications/all');
        const data = await response.json();
        // console.log("Fetched publications:", data);
        setPublications(data);
      } catch (err) {
        console.error('Failed to fetch publications:', err);
      }
    };

    fetchPublications();
  }, []);

  const filterByType = (type) =>
    publications
      .filter((pub) => pub.pType === type)
  // .sort((a, b) => parseInt(b.pYear) - parseInt(a.pYear));

  return (
    <>
      <Navbar />
      <div className="publicationBox">
        <h1>Publications</h1>
        <div className="publications">
          <div className="journal">
            <Dropdown title="Journal" className="dropdown-journal">
              {filterByType("Journal").length > 0 ? (
                filterByType("Journal").map((pub, index) => (
                  <p key={index}>
                    {pub.ieeeCitation}{' '}
                    {pub.doiLink && (
                      <>
                        DOI:{''}
                        <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="doiLink">
                          {pub.doiLink}
                        </a>
                      </>
                    )}
                  </p>
                ))
              ) : (
                <p className="no-records">No records found.</p>
              )}
            </Dropdown>
          </div>
          <div className="conference">
            <Dropdown title="Conference" className="dropdown-conference">
              {filterByType("Conference").length > 0 ? (
                filterByType("Conference").map((pub, index) => (
                  <p key={index}>{pub.ieeeCitation}</p>
                ))
              ) : (
                <p className="no-records">No records found.</p>
              )}
            </Dropdown>
          </div>
          <div className="book-chapter">
            <Dropdown title="Book-Chapter" className="dropdown-bookchapter">
              {filterByType("Book-Chapter").length > 0 ? (
                filterByType("Book-Chapter").map((pub, index) => (
                  <p key={index}>{pub.ieeeCitation}</p>
                ))
              ) : (
                <p className="no-records">No records found.</p>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Publications;
