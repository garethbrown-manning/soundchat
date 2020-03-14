import firebase from 'firebase/app';
import 'firebase/auth';

export const googleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => console.log('successfully logged in ', result.user.displayName))
    .catch((error) => console.error('There was an error when signing in with Google: ', error));
}

export const signOut = () => {
  firebase.auth().signOut()
    .then(() => console.log('User successfully signed out'))
    .catch((error) => console.error('There was an error when signing out: ', error));
}