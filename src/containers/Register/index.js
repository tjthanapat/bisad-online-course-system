import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const signUpDataDefault = {
    email: '',
    password: '',
    passwordConfirmed: '',
    firstName: '',
    lastName: '',
  };
  const [signUpData, setSignUpData] = useState(signUpDataDefault);

  useEffect(() => {
    console.log(signUpData);
  }, [signUpData]);

  const handleChangeSignUpInput = (event) => {
    setSignUpData({ ...signUpData, [event.target.id]: event.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName } = signUpData;
    const userData = { firstName, lastName };
    try {
      setLoading(true);
      await auth.signUp(email, password, userData);
      navigate('/');
    } catch (err) {
      console.error('error');
      console.error(err);
      setLoading(false);
      alert(`Error: ${err.message}`);
    }
  };
  if (auth.loading || loading) {
    return <p>Loading....</p>;
  } else if (!!auth.user) {
    return (
      <div>
        <p>You're signed in.</p>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="bg-orange-400 min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-5xl font-bold text-white mb-5">Register!</h1>
          <form onSubmit={handleSignUp}>
            <div>
              <input
                type="email"
                className="rounded p-2"
                id="email"
                placeholder="email"
                value={signUpData.email}
                onChange={handleChangeSignUpInput}
                required
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                className="rounded p-2"
                id="firstName"
                placeholder="firstName"
                value={signUpData.firstName}
                onChange={handleChangeSignUpInput}
                required
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                className="rounded p-2"
                id="lastName"
                placeholder="lastName"
                value={signUpData.lastName}
                onChange={handleChangeSignUpInput}
                required
              />
            </div>
            <div className="mt-3">
              <input
                type="password"
                className="rounded p-2"
                id="password"
                placeholder="password"
                value={signUpData.password}
                onChange={handleChangeSignUpInput}
                required
              />
            </div>
            <div className="mt-3">
              <input
                type="password"
                className="rounded p-2"
                id="passwordConfirmed"
                placeholder="confirm password"
                value={signUpData.passwordConfirmed}
                onChange={handleChangeSignUpInput}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full mt-5"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Register;
