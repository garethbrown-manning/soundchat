import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { firestoreDb } from './firebaseConfiguration';

export const writeSongToFirestore = (songArtist, songTitle) => {
  // Organize the song artist and song title into an object.
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

export const readSongsFromFirestore = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const songs = [];
        
        // Get the collection of songs for the current user.
        const songsCollection = firestoreDb.collection(`users/${user.uid}/songs`);
  
        // Get all song documents from the song collection.
        songsCollection.get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const songData = { ...doc.data(), id: doc.id };
              songs.push(songData);
            });
            resolve(songs);
          });
      }
    });
  });
}

export const deleteSongFromFirestore = (songId) => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${songId}`);
        songDocument.delete()
          .then(() => {
            console.log(`The song with an id of ${songId} has been deleted successfully`);
            resolve();
          })
          .catch(() => {
            console.error(`There was an error while trying to delete song with id ${songId}.`, error);
            resolve();
          });
      }
    });
  });
}

export const getSongFromFirestore = (songId) => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Assign the reference to the song document using songId
        const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${songId}`);

        // Get the song data from Firestore
        songDocument.get()
          .then((doc) => {
            if (doc.exists) {
              const songData = { ...doc.data(), id: doc.id };
              resolve(songData);
            }
          })
          .catch((error) => {
            console.error(`There was an error while trying to get song with id ${songId}`, error);
            resolve();
          });
      }
    });
  });
}

export const updateSongInFirebase = (song) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Assign the reference to the song document using songId
      const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${song.id}`);

      // Create a new song object
      const updatedSong = {
        songArtist: song.songArtist,
        songTitle: song.songTitle
      }

      // Update the song with the new song object including songArtist and songTitle
      songDocument.update(updatedSong)
        .then(() => console.log('Your song was updated successfully: ', song))
        .catch((error) => console.error('There was an error while updating your song: ', song, error));
    }
  });
}