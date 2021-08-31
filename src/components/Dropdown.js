const Dropdown = (props) => {
  const { coordinates, handlePick } = props;

  const style = {
    top: `${coordinates.currentY}px`,
    left: `${coordinates.currentX}px`,
  };

  const handleClick = (e) => {
    handlePick(e.target.value, coordinates.currentX, coordinates.currentY);
  };

  return (
    <div className="dropdown" style={style}>
      <button value="tom" onClick={(e) => handleClick(e)}>
        Tom
      </button>
      <button value="waldo" onClick={(e) => handleClick(e)}>
        Waldo
      </button>
      <button value="fry" onClick={(e) => handleClick(e)}>
        Fry
      </button>
    </div>
  );
};

export default Dropdown;
