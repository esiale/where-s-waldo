import '../styles/start.css';
import images from '../images';

const Start = (props) => {
  return (
    <div className="start">
      <div className="start-box">
        <p>Find the following characters:</p>
        <div className="start-box-images">
          <div className="start-box-images-box">
            <img src={images.fry} alt="Fry" />
            <p>Fry</p>
          </div>
          <div className="start-box-images-box">
            <img src={images.tom} alt="Tom" />
            <p>Tom</p>
          </div>
          <div className="start-box-images-box">
            <img src={images.waldo} alt="Waldo" />
            <p>Waldo</p>
          </div>
        </div>
        <button onClick={() => props.startGame()}>Start</button>
        <div className="start-box-footer">
          <p>
            Art by{' '}
            <a
              href="https://www.artstation.com/chekavo"
              target="_blank"
              rel="noreferrer"
            >
              Egor Klyuchnyk
            </a>
          </p>
          <p>
            Coded by{' '}
            <a
              href="https://github.com/esiale"
              target="_blank"
              rel="noreferrer"
            >
              esiale
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Start;
