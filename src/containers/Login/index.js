import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    <div className="bg-orange-400 min-h-screen flex items-center justify-center p-5">
      <div
        className="bg-white px-5 py-8 rounded-lg"
        style={{ minWidth: '300px' }}
      >
        <h1 className="text-2xl font-semibold mb-5">Courseiku</h1>
        <form onSubmit={handleSignIn}>
          <div className="my-3">
            <TextField
              id="email"
              value={signInData.email}
              onChange={handleChangeSignInInput}
              label="อีเมล"
              variant="standard"
              required
              fullWidth
            />
          </div>
          <div className="my-3">
            <TextField
              id="password"
              value={signInData.password}
              onChange={handleChangeSignInInput}
              label="รหัสผ่าน"
              variant="standard"
              type={'password'}
              required
              fullWidth
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            type="submit"
          >
            เข้าสู่ระบบ
          </Button>
        </form>
        <Link to="/signup">
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            fullWidth
            type="submit"
            sx={{marginTop:'0.5rem'}}
          >
            สมัครสมาชิก
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
