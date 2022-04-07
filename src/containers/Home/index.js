import React from 'react';
import Loading from '../../components/Loading';
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
    return <Loading/>;
  } else if (!!auth.user) {
    return (
      <>
        <div className="bg-orange-400">
          <div className="flex justify-between max-w-screen-lg mx-auto p-5">
            <h1 className="font-medium text-white text-2xl">Courseiku</h1>
            <button
              onClick={handleSignOut}
              className="rounded p-2 bg-white bg-opacity-10 hover:bg-opacity-25 text-white uppercase"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto my-5 px-5">
          <p className="md:text-right">
            Signed in as {auth.user.firstName} {auth.user.lastName} (
            {auth.user.email})
          </p>
          <hr className="my-5" />
        </div>
        <CourseList />
      </>
    );
  } else {
    return <Login />;
  }
};

export default Home;
