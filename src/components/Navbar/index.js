import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const auth = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-orange-400">
      <div className="max-w-screen-lg flex justify-between items-center mx-auto p-5">
        <Link to="/">
          <h1 className="font-medium text-white text-2xl">Courseiku</h1>
        </Link>
        <button
          onClick={handleSignOut}
          className="rounded py-2 px-5 bg-white bg-opacity-10 hover:bg-opacity-25 text-white uppercase"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
