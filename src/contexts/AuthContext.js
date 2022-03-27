import React, { useState, useContext, createContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  const { Provider } = AuthContext;
  return <Provider value={auth}>{children}</Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch((err) => {
          setLoading(false);
          reject(err);
        });
    });
  };

  const signOut = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      signOutFirebase(auth)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          reject(err);
        });
    });
  };

  const signUp = async (email, password, userData) => {
    try {
      const user = await createUser(email, password);
      await writeUserData(user.uid, userData);
      return { ...user, ...userData };
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!!user) {
        console.log('Reading...');
        getUserData(user.uid).then((userData) => {
          setUser({ ...user, ...userData });
          setLoading(false);
        });
      } else {
        setUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return { user, loading, signIn, signOut, signUp };
};

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

const writeUserData = (uid, userData) => {
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
