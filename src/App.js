import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import './styles/style.css';
import Board from './components/Board';
import Loader from './components/Loader';
import database from './firebase.config';

const App = () => {
  const [loading, setLoading] = useState(true);

  let data = [];

  const fetchData = async () => {
    const response = collection(database, 'data');
    const dataSnapshot = await getDocs(response);
    data = dataSnapshot.docs.map((doc) =>
      Object.assign({ name: doc.id }, doc.data())
    );
    setLoading(false);
  };

  const compareData = (value, currentX, currentY) => {
    const character = data.find((item) => item.name === value);
    const { width, height, sizeX, sizeY } = character;
    if (
      currentX >= width &&
      currentX <= width + sizeX &&
      currentY >= height &&
      currentY <= height + sizeY
    )
      alert('win!');
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      {loading ? <Loader /> : null}
      <Board compareData={compareData} />
    </div>
  );
};

export default App;
