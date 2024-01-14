import React, { useState } from 'react';
import './DropDown.css'; // Importing the CSS for styling

const DropDown = ({caption, content}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown">
            <button className={isOpen?"dropdown-button-selected":"dropdown-button"} onClick={toggleDropdown}>
                {caption}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {content}
                </div>
            )}
        </div>
    );
};

export default DropDown;
