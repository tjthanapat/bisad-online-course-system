import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addUserData = (uid, userData) => {
  return new Promise((resolve, reject) => {
    setDoc(doc(db, 'users', uid), userData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const signUp = async (email, password, userData) => {
  try {
    const user = await createUser(email, password);
    await addUserData(user.uid, userData);
    return { ...user, ...userData };
  } catch (err) {
    throw err;
  }
};

export default signUp;
