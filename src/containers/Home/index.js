import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../Login';

const Home = () => {
  const auth = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  if (auth.loading) {
    return <p>Loading...</p>;
  } else if (!!auth.user) {
    return (
      <div>
        <p>You're signed in.</p>
        <p>Signed in as {auth.user.firstName} {auth.user.lastName}</p>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default Home;
