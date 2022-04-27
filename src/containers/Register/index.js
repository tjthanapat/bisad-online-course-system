import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingPage from '../../components/LoadingPage';
import Logo from '../../assets/logo1.svg';

const Register = () => {
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Courseiku | สมัครสมาชิก';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const signUpDataDefault = {
    email: '',
    password: '',
    passwordConfirmed: '',
    firstName: '',
    lastName: '',
  };
  const [signUpData, setSignUpData] = useState(signUpDataDefault);

  const handleChangeSignUpInput = (event) => {
    setSignUpData({ ...signUpData, [event.target.id]: event.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, passwordConfirmed, firstName, lastName } =
      signUpData;
    const userData = { firstName, lastName };
    try {
      setLoading(true);
      if (password !== passwordConfirmed) {
        const err = new Error(`Password and confrim password don't match.`);
        throw err;
      }
      await auth.signUp(email, password, userData);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err);
      setOpenDialog(true);
      setLoading(false);
    }
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (auth.loading || loading) {
    return <LoadingPage />;
  } else if (success) {
    return (
      <div className="bg-gradient-to-r from-orange-400  to-orange-300 min-h-screen flex flex-col items-center justify-center p-5">
         <img className='h-30 w-60' 
              src={Logo}/>
        <div
          className="bg-white px-5 py-8 rounded-xl shadow-xl"
          style={{ minWidth: '300px' }}
        >
          <h2 className="text-lg font-medium mb-5">สมัครสมาชิกสำเร็จ</h2>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
              type="submit"
            >
              หน้าแรก
            </Button>
          </Link>
        </div>
        <p className="text-white mt-16">Courseiku © 2022</p>
      </div>
    );
  } else if (!!auth.user) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <>
        <div className="bg-gradient-to-r from-orange-400  to-orange-300 min-h-screen flex flex-col items-center justify-center p-5">
        <img className='h-30 w-60' 
              src={Logo}/>
          <div
            className="bg-white px-5 py-8 rounded-xl shadow-xl"
            style={{ minWidth: '300px' }}
          >
            <h2 className="text-lg">สมัครสมาชิก</h2>
            <form onSubmit={handleSignUp}>
              <div className="my-5 flex flex-col space-y-2">
                <TextField
                  id="email"
                  type="email"
                  value={signUpData.email}
                  onChange={handleChangeSignUpInput}
                  label="อีเมล"
                  variant="standard"
                  required
                  fullWidth
                />
                <TextField
                  id="firstName"
                  type="text"
                  value={signUpData.firstName}
                  onChange={handleChangeSignUpInput}
                  label="ชื่อ"
                  variant="standard"
                  required
                  fullWidth
                />
                <TextField
                  id="lastName"
                  type="text"
                  value={signUpData.lastName}
                  onChange={handleChangeSignUpInput}
                  label="นามสกุล"
                  variant="standard"
                  required
                  fullWidth
                />
                <TextField
                  id="password"
                  type="password"
                  value={signUpData.password}
                  onChange={handleChangeSignUpInput}
                  label="รหัสผ่าน"
                  variant="standard"
                  required
                  fullWidth
                />
                <TextField
                  id="passwordConfirmed"
                  type="password"
                  value={signUpData.passwordConfirmed}
                  onChange={handleChangeSignUpInput}
                  label="ยืนยันรหัสผ่าน"
                  variant="standard"
                  required
                  fullWidth
                />
              </div>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                fullWidth
                type="submit"
              >
                สมัครสมาชิก
              </Button>
            </form>
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

export default Register;
