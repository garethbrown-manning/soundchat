import '../firebase/firebaseConfiguration';
import { assignClick, initializeSigninButtons, addSongToMySongs } from './utilities';
import {
  googleSignin,
  signOut,
  facebookSignin,
  twitterSignin,
  emailSignin,
  createEmailSigninAccount,
  anonymousSignin
} from '../firebase/firebaseAuthentication';
import {
  writeSongToFirestore,
  readSongsFromFirestore,
  deleteSongFromFirestore,
  getSongFromFirestore,
  updateSongInFirebase,
  getAudioFromStorage
} from '../firebase/firebaseRepository';

initializeSigninButtons();
anonymousSignin();

assignClick('signin-google', googleSignin);
assignClick('signin-facebook', facebookSignin);
assignClick('signin-twitter', twitterSignin);
assignClick('appbar-signout-button', signOut);

const emailSigninForm = document.getElementById('email-signin-form');
if (emailSigninForm) {
  emailSigninForm.onsubmit = (event) => {
    event.preventDefault();
    const email = event.target['email-input'].value;
    const password = event.target['password-input'].value;
    emailSignin(email, password);
  }
}

const createEmailSigninForm = document.getElementById('create-email-signin');
if (createEmailSigninForm) {
  createEmailSigninForm.onsubmit = (event) => {
    event.preventDefault();
    const email = event.target['email-input'].value;
    const password = event.target['password-input'].value;
    createEmailSigninAccount(email, password);
  }
}

const createTuneForm = document.getElementById('add-tune-form');
if (createTuneForm) {
  createTuneForm.onsubmit = (event) => {
    event.preventDefault();
    const songArtist = event.target['artist-input'].value;
    const songTitle = event.target['song-title-input'].value;
    const songFile = event.target['song-file'].files[0];
    writeSongToFirestore(songArtist, songTitle, songFile);
  }
}

const mySongsComponent = document.getElementById('my-songs-component');
if (mySongsComponent) {
  readSongsFromFirestore()
    .then((songs) => {
      songs.forEach((song) => {
        addSongToMySongs(mySongsComponent, song);
      });
    });
}

window.deleteSong = function(id) {
  deleteSongFromFirestore(id)
    .then(() => window.location.reload());
}

const editSongForm = document.getElementById('edit-tune-form');
if (editSongForm) {
  const searchParams = new URLSearchParams(location.search);
  const songId = searchParams.get('id');
  // Get song from Firestore
  getSongFromFirestore(songId)
    .then((song) => {
      // Populate the form with song artist, song title and song id
      editSongForm.elements['song-id'].value = song.id;
      editSongForm.elements['artist-input-edit'].value = song.songArtist;
      editSongForm.elements['song-title-input-edit'].value = song.songTitle;
    });

  // Create on submit function
  editSongForm.onsubmit = (event) => {
    event.preventDefault();
    const id = event.target['song-id'].value;
    const songArtist = event.target['artist-input-edit'].value;
    const songTitle = event.target['song-title-input-edit'].value;
    const song = { id, songArtist, songTitle };
    updateSongInFirebase(song);
  }
}

const audioElement = document.getElementById('audio-component');
if (audioElement) {
  const searchParams = new URLSearchParams(location.search);
  const fileName = searchParams.get('filename');
  const userId = searchParams.get('userid');
  getAudioFromStorage(userId, fileName)
    .then((fileUrl) => {
      audioElement.setAttribute('src', fileUrl);
    });
}