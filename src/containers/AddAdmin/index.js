import React, { useState } from 'react';
import { functions } from '../../firebase';
import { httpsCallable } from "firebase/functions";


const AddAdmin = () => {
  const [email, setEmail] = useState('');

  const handleChangeInput = (event) => {
    setEmail(event.target.value);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      console.log(email);
      const addAdminRole = httpsCallable(functions, 'addAdminRole');
      addAdminRole({ email: email }).then((result) => {
        console.log(result);
      });
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-orange-400 min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold text-white mb-5">Add Admin!</h1>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              className="w-full rounded p-2"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full mt-5"
          >
            Make Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
