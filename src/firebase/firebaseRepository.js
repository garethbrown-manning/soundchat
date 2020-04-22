import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { firestoreDb } from './firebaseConfiguration';

export const writeSongToFirestore = (songArtist, songTitle) => {
  // Organise the song artist and song title into an object.
  const song = {
    songArtist,
    songTitle
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get the collection of songs for the current user.
      const songsCollection = firestoreDb.collection(`users/${user.uid}/songs`);

      // Add the song to a document in the songs collection and log the document id.
      songsCollection.add(song)
        .then((docRef) => console.log('Song document Id: ', docRef.id))
        .catch((error) => console.error('There was an error while writing a song to firestore: ', error));
    }
  });
}