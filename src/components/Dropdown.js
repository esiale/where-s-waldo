import '../styles/dropdown.css';

const Dropdown = (props) => {
  const { coordinates, handlePick, objective } = props;

  const style = {
    top: `${coordinates.currentY}px`,
    left: `${coordinates.currentX}px`,
  };

  const handleClick = (e) => {
    handlePick(e.target.value, coordinates.currentX, coordinates.currentY);
  };

  return (
    <div className="dropdown" style={style}>
      {objective.tom ? null : (
        <button value="tom" onClick={(e) => handleClick(e)}>
          Tom
        </button>
      )}
      {objective.waldo ? null : (
        <button value="waldo" onClick={(e) => handleClick(e)}>
          Waldo
        </button>
      )}
      {objective.fry ? null : (
        <button value="fry" onClick={(e) => handleClick(e)}>
          Fry
        </button>
      )}
    </div>
  );
};

export default Dropdown;
