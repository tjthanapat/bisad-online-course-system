import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const getUserData = (uid) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, 'users', uid))
      .then((docSnap) => {
        resolve(docSnap.data());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getUserData;
