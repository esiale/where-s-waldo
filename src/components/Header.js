import images from '../images';
import '../styles/header.css';

const Header = (props) => {
  const { objective } = props;
  return (
    <header>
      <div className="images-container">
        {objective.fry ? null : (
          <div className="images-container-box">
            <img src={images.fry} alt="Fry" />
            <p>Fry</p>
          </div>
        )}
        {objective.tom ? null : (
          <div className="images-container-box">
            <img src={images.tom} alt="Tom" />
            <p>Tom</p>
          </div>
        )}
        {objective.waldo ? null : (
          <div className="images-container-box">
            <img src={images.waldo} alt="Waldo" />
            <p>Waldo</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
