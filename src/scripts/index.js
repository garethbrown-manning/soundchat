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
  deleteSongFromFirestore
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
    writeSongToFirestore(songArtist, songTitle);
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