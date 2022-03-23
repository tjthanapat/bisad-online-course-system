import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default signIn;
