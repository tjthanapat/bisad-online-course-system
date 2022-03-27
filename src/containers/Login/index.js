import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const auth = useAuth();
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const handleChangeSignInInput = (event) => {
    setSignInData({ ...signInData, [event.target.id]: event.target.value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = signInData;
    try {
      await auth.signIn(email, password);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-orange-400 min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold text-white mb-5">Login!</h1>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              className="rounded p-2"
              id="email"
              placeholder="email"
              value={signInData.email}
              onChange={handleChangeSignInInput}
              required
            />
          </div>
          <div className="mt-3">
            <input
              type="password"
              className="rounded p-2"
              id="password"
              placeholder="password"
              value={signInData.password}
              onChange={handleChangeSignInInput}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full mt-5"
          >
            Login
          </button>
        </form>
        <Link to="/signup">
          <button className="bg-white hover:bg-gray-300 font-bold py-2 px-4 rounded-full w-full mt-2">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
