import React, { useState } from 'react';
import './ButtonNewBirthday.css';

function ButtonNewBirthday({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className="button-new-birthday"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="button-icon">🎂</span>
      <span className="button-text">New Birthday</span>
    </button>
  );
}

export default ButtonNewBirthday;