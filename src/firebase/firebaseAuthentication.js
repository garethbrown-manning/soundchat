import firebase from 'firebase/app';
import 'firebase/auth';

export const googleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => console.log('successfully logged in ', result.user.displayName))
    .catch((error) => console.error('There was an error when signing in with Google: ', error));
}

export const facebookSignin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => console.log('successfully logged in: ', result.user.displayName))
    .catch((error) => console.error('There was an error when signing in with Facebook: ', error));
}

export const twitterSignin = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => console.log('successfully logged in: ', result.user.displayName))
    .catch((error) => console.error('There was an error when signing in with Twitter: ', error));
}

export const signOut = () => {
  firebase.auth().signOut()
    .then(() => console.log('User successfully signed out'))
    .catch((error) => console.error('There was an error when signing out: ', error));
}

export const emailSignin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => console.log('User successfully signed in with email and password.'))
    .catch((error) => console.error('There was an error while signing in with email and password: ', error));
}

export const createEmailSigninAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => console.log('User successfully created an account with email and password'))
    .catch((error) => console.error('There was an error while creating a new user with email and password: ', error));
}