import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../styles/scoreboard.css';
import ScoreboardEntry from './ScoreboardEntry';
import database from '../firebase.config';
import Spinner from './Spinner';

const Scoreboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [sentScore, setSentScore] = useState(false);
  const [scores, setScores] = useState(null);
  const [latestScore, setLatestScore] = useState(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const { formatTime, time } = props;

  useEffect(() => {
    const fetchScores = async () => {
      const response = collection(database, 'scores');
      const scoresQuery = await query(response, orderBy('time'), limit(10));
      const latestScoreQuery = await query(
        response,
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      const scoresSnapshot = await getDocs(scoresQuery);
      const latestScoreSnapshot = await getDocs(latestScoreQuery);
      if (!latestScoreSnapshot.empty) {
        setLatestScore(latestScoreSnapshot.docs[0].data());
      } else {
        setLatestScore({ name: '---', time: '0' });
      }
      if (!scoresSnapshot.empty) {
        setScores(scoresSnapshot.docs.map((doc) => doc.data()));
      } else {
        setScores([{ name: '---', time: '0' }]);
      }
      setLoading(false);
    };
    fetchScores();
  }, [sentScore]);

  useEffect(() => {
    const checkIfUserSubmitted = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      setUserId(user.uid);
      const docRef = doc(database, 'scores', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSentScore(true);
      }
    };
    checkIfUserSubmitted();
  }, [userId]);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addScore();
  };

  const addScore = async () => {
    try {
      setLoading(true);
      await setDoc(doc(database, 'scores', userId), {
        name: name,
        time: time,
        timestamp: serverTimestamp(),
      });
      setSentScore(true);
    } catch (error) {
      console.error('Error writing score to database', error);
    }
  };

  const processScores = (scores) => {
    return scores.map((score) => ({
      ...score,
      time: formatTime(score.time),
    }));
  };

  if (loading)
    return (
      <div className="scoreboard">
        <Spinner />
      </div>
    );

  return (
    <div className="scoreboard">
      <div className="scoreboard-box">
        <p id="scoreboard-box-header">
          Congratulations! Your time is <span>{formatTime(time)}</span>
        </p>
        <div className="scoreboard-entries">
          {processScores(scores).map((entry) => (
            <ScoreboardEntry key={uniqid()} data={entry} />
          ))}
        </div>
        <div className="scoreboard-last-entry">
          <p>Last winner:</p>
          <div className="scoreboard-entries">
            <ScoreboardEntry
              data={{ ...latestScore, time: formatTime(latestScore.time) }}
            />
          </div>
        </div>
        {sentScore ? (
          <div className="scoreboard-thanks">Thank you for playing!</div>
        ) : (
          <form className="scoreboard-input" onSubmit={(e) => handleSubmit(e)}>
            <p>Enter your name:</p>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              required
              maxlength="18"
            />
            <button>Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
