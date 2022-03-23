import { auth } from '../../firebase';
import { signOut as signOutAuth } from 'firebase/auth';

const signOut = () => {
  return new Promise((resolve, reject) => {
    signOutAuth(auth)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default signOut;
