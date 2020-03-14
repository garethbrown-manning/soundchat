import '../firebase/firebaseConfiguration';
import { assignClick, initializeSigninButtons } from './utilities';
import {
  googleSignin,
  signOut,
  facebookSignin,
  twitterSignin,
  emailSignin,
  createEmailSigninAccount,
  anonymousSignin
} from '../firebase/firebaseAuthentication';

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