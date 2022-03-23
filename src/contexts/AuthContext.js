import React, { useState, useContext, createContext, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../functions/authentication';

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

  return { user, loading, setLoading };
};
