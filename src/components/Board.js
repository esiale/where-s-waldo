import mainImage from '../images/main-image.jpeg';
import { useRef, useState } from 'react';
import Dropdown from './Dropdown';

const Board = (props) => {
  const { compareData, objective } = props;
  const image = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownCoordinates, setDropdownCoordinates] = useState({});

  const handlePick = (value, currentX, currentY) => {
    const bounding = image.current.getBoundingClientRect();
    const naturalWidth = 1920;
    const naturalHeight = 2715;
    const currentWidth = bounding.width;
    const currentHeight = bounding.height;
    const naturalX = ((naturalWidth / currentWidth) * currentX).toFixed();
    const naturalY = ((naturalHeight / currentHeight) * currentY).toFixed();
    compareData(value, naturalX, naturalY);
    setShowDropdown(false);
  };

  const handleClick = (e) => {
    const bounding = image.current.getBoundingClientRect();
    const currentX = e.clientX - bounding.left;
    const currentY = e.clientY - bounding.top;
    handleDropdown(currentX, currentY);
  };

  const handleDropdown = (currentX, currentY) => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
    setDropdownCoordinates({ currentX, currentY });
  };

  return (
    <div className="main">
      {showDropdown ? (
        <Dropdown
          coordinates={dropdownCoordinates}
          objective={objective}
          handlePick={handlePick}
        />
      ) : null}
      <img
        src={mainImage}
        className="main-image"
        alt="Universe 113 Egor Klyuchnyk"
        ref={image}
        onClick={(e) => handleClick(e)}
      />
    </div>
  );
};

export default Board;
