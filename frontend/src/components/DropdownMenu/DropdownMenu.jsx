import { useEffect } from 'react';
import './DropdownMenu.css';
import { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';


export const DropdownMenu = ({children, id='', className="DropdownMenu", options, placeholder, setReviewLessonFromDropdown, value, setValue})=> {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  

  useEffect(()=>{
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);


  const handleInputClick = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  
  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label;
    };
    return placeholder;
  };


  const onItemClick = option => {
    setSelectedValue(option);
  };

  const onNavItemClick = option => {
    setValue(option);
  };

  

  const isSelected = option => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  }



  return (
    <div onClick={handleInputClick} className={className}>
      <div className="dropdown-tools"> 
    <div className="dropdown-tools"> 
      <div className="dropdown-tools review-dropdown-tools"> 
        <div className="dropdown-selected-value" id="dropdown-selected-value">{getDisplay()}</div>
          <div className="dropdown-tool reviewFormDropMenu">
            <Icon />
          </div>
      </div> 
    </div> 
      </div> 
      <div className="dropdown-input">
        {showMenu && <div className="dropdown-menu reviewFormDropMenu">
          {options.map( option => (
            <div onClick={() => onItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`}>
              {option.label}
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default DropdownMenu;