import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5CdhwlU7WpVcuAuqjxBQX8KuallsOAhM",
  authDomain: "sound-chat-526d0.firebaseapp.com",
  databaseURL: "https://sound-chat-526d0.firebaseio.com",
  projectId: "sound-chat-526d0",
  storageBucket: "sound-chat-526d0.appspot.com",
  messagingSenderId: "590691236668",
  appId: "1:590691236668:web:27270667fafdd7af01fc39"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestoreDb = firebase.firestore();

export const cloudStorage = firebase.storage();