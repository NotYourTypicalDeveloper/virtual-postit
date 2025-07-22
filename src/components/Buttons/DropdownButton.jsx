import { useState } from "react";
import "./dropdownButton.scss";

const DropdownButton = ({ label, icon, modalContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {label && (
        <>
          <div>
            <button
              role="button"
              className="navbar-btn"
              onClick={toggleDropdown}
            >
              {label} {icon && icon}
            </button>
          </div>

          {isOpen && (
            <div className="info-overlay" onClick={toggleDropdown}>
              {modalContent}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DropdownButton;
