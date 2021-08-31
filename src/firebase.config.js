import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBLRN1FXU83pjr8xX1xwogPuN4vtgnjbMI',
  authDomain: 'where-s-waldo-c7d9b.firebaseapp.com',
  projectId: 'where-s-waldo-c7d9b',
  storageBucket: 'where-s-waldo-c7d9b.appspot.com',
  messagingSenderId: '1075313490944',
  appId: '1:1075313490944:web:0971b0ff214854511a2ce5',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
