import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { firestoreDb, cloudStorage } from './firebaseConfiguration';

export const writeSongToFirestore = (songArtist, songTitle, songFile) => {
  // Organize the song artist and song title into an object.
  const song = {
    songArtist,
    songTitle,
    songFileName: songFile.name
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get the collection of songs for the current user.
      const songsCollection = firestoreDb.collection(`users/${user.uid}/songs`);

      // Add the song to a document in the songs collection and log the document id.
      songsCollection.add(song)
        .then((docRef) => {
          console.log('Song document Id: ', docRef.id);
          saveSongFile(docRef.id, songFile);
        })
        .catch((error) => console.error('There was an error while writing a song to firestore: ', error));
    }
  });
}

const saveSongFile = (docRefId, songFile) => {
  // Create a reference to the file path in Cloud Storage.
  // This will create the path if it does not already exist.
  const fileRef = cloudStorage.ref(`songs/${docRefId}-${songFile.name}`);

  // Upload the file to Cloud Storage.
  const uploadTask = fileRef.put(songFile);

  // The returned task can indicate changes in the state of the file upload.
  uploadTask.on('state_changed',

    // The progress function can indicate how many bytes have been transferred to Cloud Storage.
    function progress(snapshot) {
      console.log('Bytes transferred: ', snapshot.bytesTransferred);
      console.log('Total bytes: ', snapshot.totalBytes);
    },

    // The error function will be called if there is an error while the file is uploading.
    function error(error) {
      console.error('There was an error while saving to Cloud Storage: ', error);
    },

    // The complete function will be called once the upload has completed successfully.
    function complete() {
      console.log('File successfully saved to Cloud Storage');
    }
  );
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

export const getAudioFromStorage = (fileName) => {
  return new Promise((resolve) => {
    // Get the reference to the file in Cloud Storage
    const fileRef = cloudStorage.ref(`songs/${fileName}`);

    // Get the URL for the song file in Cloud Storage
    fileRef.getDownloadURL()
      .then((url) => resolve(url))
      .catch((error) => console.error('There was an error while retrieving a file from Cloud Storage', error));
  });
}