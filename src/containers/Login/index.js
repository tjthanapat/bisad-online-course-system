import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingPage from '../../components/LoadingPage';

const Login = () => {
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Courseiku | ลงชื่อเข้าใช้งาน';
  });

  const [error, setError] = useState(null);
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const handleChangeSignInInput = (event) => {
    setSignInData({ ...signInData, [event.target.id]: event.target.value });
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = signInData;
    try {
      await auth.signIn(email, password);
    } catch (err) {
      console.error(err);
      setError(err);
      setOpenDialog(true);
    }
  };

  if (auth.loading) {
    return <LoadingPage />;
  } else if (!!auth.user) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <>
        <div className="bg-orange-400 min-h-screen flex flex-col items-center justify-center p-5">
          <h1 className="text-4xl font-semibold text-white mb-8">Courseiku</h1>
          <div
            className="bg-white px-5 py-8 rounded-xl shadow-xl"
            style={{ minWidth: '300px' }}
          >
            <h2 className="text-lg">ลงชื่อเข้าสู่ระบบ</h2>
            <form onSubmit={handleSignIn}>
              <div className="my-5 flex flex-col space-y-2">
                <TextField
                  id="email"
                  type="email"
                  value={signInData.email}
                  onChange={handleChangeSignInInput}
                  label="อีเมล"
                  variant="standard"
                  required
                  fullWidth
                />
                <TextField
                  id="password"
                  type="password"
                  value={signInData.password}
                  onChange={handleChangeSignInInput}
                  label="รหัสผ่าน"
                  variant="standard"
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
            <Link to="/register">
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                fullWidth
                type="submit"
                sx={{ marginTop: '0.5rem' }}
              >
                สมัครสมาชิก
              </Button>
            </Link>
          </div>
          <p className="text-white mt-16">Courseiku © 2022</p>
        </div>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">เกิดข้อผิดพลาด</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {!!error && error.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} autoFocus>
              ปิด
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};

export default Login;
