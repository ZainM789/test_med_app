import React, { useState, useRef, useEffect } from 'react';
import './FindDoctorSearch.css';

const SPECIALITIES = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearch = ({ onSelectSpeciality }) => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Filter specialties based on search input
  const filtered = SPECIALITIES.filter(s =>
    s.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };
    if (showList) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showList]);

  const handleSelect = (speciality) => {
    setSearch(speciality);
    setShowList(false);
    if (onSelectSpeciality) onSelectSpeciality(speciality);
  };

  return (
    <div className="find-doctor-search" ref={containerRef}>
      <div className="search-bar-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-bar-input"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setShowList(true)}
        />
        <button className="search-bar-icon-btn" tabIndex={-1}>
          <img
            src={process.env.PUBLIC_URL + '/images/search.svg'}
            alt="search"
            className="search-bar-icon"
          />
        </button>
      </div>
      {showList && (
        <div className="search-dropdown">
          {filtered.length === 0 ? (
            <div className="dropdown-no-result">No specialties found</div>
          ) : (
            filtered.map((speciality) => (
              <div
                className="dropdown-item"
                key={speciality}
                onMouseDown={() => handleSelect(speciality)}
              >
                <span className="dropdown-item-icon">
                  <img
                    src={process.env.PUBLIC_URL + '/images/search.svg'}
                    alt=""
                  />
                </span>
                <span className="dropdown-item-speciality">{speciality}</span>
                <span className="dropdown-item-type">SPECIALITY</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FindDoctorSearch;