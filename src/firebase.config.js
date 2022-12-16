import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyAFj5NLnbiUNEruB7cRSY2D4B0kOQuPD7Y',
  authDomain: 'food-c3b1d.firebaseapp.com',
  databaseURL: 'https://food-c3b1d-default-rtdb.firebaseio.com',
  projectId: 'food-c3b1d',
  storageBucket: 'food-c3b1d.appspot.com',
  messagingSenderId: '981012369600',
  appId: '1:981012369600:web:47674f9575fb7530729d25',
};

const app =
  getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
