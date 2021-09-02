import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import './styles/style.css';
import images from './images.js';
import Header from './components/Header';
import Board from './components/Board';
import Loader from './components/Loader';
import Timer from './components/Timer';
import Start from './components/Start';
import Message from './components/Message';
import Scoreboard from './components/Scoreboard';
import database from './firebase.config';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [gameConcluded, setGameConcluded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [objective, setObjective] = useState({
    fry: false,
    tom: false,
    waldo: false,
  });
  const [showMessage, setShowMessage] = useState(false);

  const data = useRef(null);
  const message = useRef(null);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const startGame = () => {
    setTimerIsActive(true);
    setGameStarted(true);
  };

  const compareData = (value, currentX, currentY) => {
    const character = data.current.find((item) => item.name === value);
    const { width, height, sizeX, sizeY } = character;
    if (
      currentX >= width &&
      currentX <= width + sizeX &&
      currentY >= height &&
      currentY <= height + sizeY
    ) {
      setObjective((prevState) => {
        return { ...prevState, [value]: true };
      });
      message.current = value;
    } else message.current = null;
    setShowMessage(true);
  };

  useEffect(() => {
    if (Object.values(objective).every((item) => item === true)) {
      setTimerIsActive(false);
      setGameConcluded(true);
    }
  }, [objective]);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log('Successfully logged in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, []);

  useEffect(() => {
    const cacheImage = async (images) => {
      try {
        Object.values(images).forEach(async (image) => {
          const img = new Image();
          img.src = await image;
        });
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async () => {
      const response = collection(database, 'data');
      const dataSnapshot = await getDocs(response);
      data.current = dataSnapshot.docs.map((doc) =>
        Object.assign({ name: doc.id }, doc.data())
      );
    };

    const loadAll = async () => {
      await cacheImage(images);
      await fetchData();
      setLoading(false);
    };

    loadAll();
  }, []);

  useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerIsActive]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [showMessage]);

  if (loading) return <Loader />;

  return (
    <div className="wrapper">
      {showMessage ? <Message name={message.current} /> : null}
      <Timer time={formatTime(time)} />
      {gameStarted ? <Header objective={objective} /> : null}
      <Board compareData={compareData} objective={objective} />
      {gameStarted ? null : <Start startGame={startGame} />}
      {gameConcluded ? (
        <Scoreboard time={time} formatTime={formatTime} />
      ) : null}
    </div>
  );
};

export default App;
