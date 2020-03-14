import '../firebase/firebaseConfiguration';
import { assignClick, initializeSigninButtons } from './utilities';
import { googleSignin, signOut, facebookSignin } from '../firebase/firebaseAuthentication';

initializeSigninButtons();

assignClick('signin-google', googleSignin);
assignClick('signin-facebook', facebookSignin);
assignClick('appbar-signout-button', signOut);
