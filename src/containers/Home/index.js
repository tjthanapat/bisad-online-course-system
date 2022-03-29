import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CourseList from '../CourseList';
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
        <p>
          Signed in as {auth.user.firstName} {auth.user.lastName} (
          {auth.user.email})
        </p>
        <p>Role: {auth.user.admin ? 'Admin' : 'User'}</p>
        <button
          onClick={handleSignOut}
          className="rounded p-2 bg-orange-500 text-white uppercase"
        >
          Sign out
        </button>
        <hr className="my-5" />
        <CourseList />
      </div>
    );
  } else {
    return <Login />;
  }
};

export default Home;
