import '../firebase/firebaseConfiguration';
import { assignClick, initializeSigninButtons } from './utilities';
import { googleSignin, signOut } from '../firebase/firebaseAuthentication';

initializeSigninButtons();

assignClick('signin-google', googleSignin);
assignClick('appbar-signout-button', signOut);