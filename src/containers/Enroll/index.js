import React, { useState } from 'react';
import { enroll } from '../../functions/enroll';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';

import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingPage from '../../components/LoadingPage';

const Enroll = (props) => {
  const auth = useAuth();
  const { course, enrolled, setEnrolled } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const paymentDataDefault = {
    cardNumber: '',
    cardHolderName: '',
    cardSecurityCode: '',
  };
  const [paymentData, setPaymentData] = useState(paymentDataDefault);
  const [cardExpiryDate, setCardExpiryDate] = useState(null);

  const [cardNumberInvalid, setCardNumberInvalid] = useState(false);
  const handleChangeCardNumber = (event) => {
    setPaymentData({ ...paymentData, cardNumber: event.target.value });
    if (/^[0-9]{16}$/.test(event.target.value)) {
      setCardNumberInvalid(false);
    } else {
      setCardNumberInvalid(true);
    }
  };

  const [cardHolderNameInvalid, setCardHolderNameInvalid] = useState(false);
  const handleChangeCardHolderName = (event) => {
    setPaymentData({ ...paymentData, cardHolderName: event.target.value });
    if (/^[a-zA-Z ]+$/.test(event.target.value)) {
      setCardHolderNameInvalid(false);
    } else {
      setCardHolderNameInvalid(true);
    }
  };

  const [cardSecurityCodeInvalid, setCardSecurityCodeInvalid] = useState(false);
  const handleChangeCardSecurityCode = (event) => {
    setPaymentData({ ...paymentData, cardSecurityCode: event.target.value });
    if (/^[0-9]{3}$/.test(event.target.value)) {
      setCardSecurityCodeInvalid(false);
    } else {
      setCardSecurityCodeInvalid(true);
    }
  };

  const [cardExpiryDateInvalid, setCardExpiryDateInvalid] = useState(false);
  const handleExpiryDateError = (err) => {
    if (!err) {
      setCardExpiryDateInvalid(false);
    } else {
      setCardExpiryDateInvalid(true);
    }
  };
  const handleExpiryDateAccept = (date) => {
    if (date) {
      setCardExpiryDateInvalid(false);
      console.log('accept');
    } else {
      setCardExpiryDateInvalid(true);
    }
  };

  const handleSubmitEnroll = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const enrollmentData = {
        courseId: course.id,
        userId: auth.user.uid,
        enrolledPrice: course.price,
        paymentType: 'credit/debit',
        cardNumber: paymentData.cardNumber,
        cardHolderName: paymentData.cardHolderName,
      };
      await enroll(auth.user.uid, course.id, enrollmentData);
      setEnrolled(true);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setOpenDialog(true);
      setLoading(false);
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <LoadingPage />;
  } else if (success) {
    return (
      <div className="bg-orange-400 min-h-screen flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl font-semibold text-white mb-8">Courseiku</h1>
        <div
          className="bg-white px-5 py-8 rounded-xl shadow-xl"
          style={{ minWidth: '300px' }}
        >
          <h2 className="text-lg font-medium">ลงทะเบียนเรียนสำเร็จ</h2>
          <p className="mb-5">คุณได้ทำการลงทะเบียนเรียนคอร์ส {course.name}</p>
          <Link to={`/course/${course.id}`}>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
            >
              ไปยังหน้าคอร์สเรียน
            </Button>
          </Link>
        </div>
        <p className="text-white mt-16">Courseiku © 2022</p>
      </div>
    );
  } else if (auth.user.admin) {
    return <p>Admin cannot enroll to the course.</p>;
  } else if (enrolled) {
    return <Navigate to={`/course/${course.id}`} replace />;
  } else {
    return (
      <>
        <Navbar />
        <div className="max-w-screen-lg mx-auto my-5 px-5">
          <h1 className="font-medium text-3xl text-orange-400 mt-16">
            ลงทะเบียนเรียนคอร์ส {course.name}
          </h1>
          <div className="mt-10 flex flex-col md:flex-row">
            <div className="md:w-1/3 md:pr-8 mb-10">
              <h2 className="font-medium text-2xl text-orange-400">
                รายละเอียดคอร์ส
              </h2>
              <p>ชื่อคอร์ส : {course.name}</p>
              <p>ผู้สอน : {course.instructor}</p>
              <p className="mt-4">
                ราคา{' '}
                <span className="text-xl">
                  {Number(course.price).toLocaleString('en', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>{' '}
                บาท
              </p>
            </div>
            <div className="md:w-2/3">
              <h2 className="font-medium text-2xl text-orange-400">ชำระเงิน</h2>
              <p>ชำระเงินผ่านบัตรเครดิต/เดบิต</p>
              <form onSubmit={handleSubmitEnroll}>
                <div className="mt-3 space-y-3">
                  <TextField
                    id="cardNumber"
                    type="tel"
                    label="หมายเลขบัตรเครดิต/เดบิต"
                    value={paymentData.cardNumber}
                    onChange={handleChangeCardNumber}
                    error={cardNumberInvalid}
                    helperText={
                      cardNumberInvalid
                        ? 'กรอกหมายเลขบัตรเครดิต/เดบิต 16 หลัก'
                        : ''
                    }
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]{16}',
                      autoComplete: 'cc-number',
                      maxLength: 16,
                      placeholder: 'หมายเลขบัตรเครดิต/เดบิต',
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  />
                  <TextField
                    id="cardHolderName"
                    type="text"
                    label="ชื่อบนบัตร (ภาษาอังกฤษ)"
                    value={paymentData.cardHolderName}
                    onChange={handleChangeCardHolderName}
                    error={cardHolderNameInvalid}
                    helperText={
                      cardHolderNameInvalid ? 'กรอกด้วยภาษาอังกฤษ' : ''
                    }
                    inputProps={{
                      pattern: '[a-zA-Z ]+',
                      placeholder: 'ชื่อบนบัตร (ภาษาอังกฤษ)',
                    }}
                    variant="outlined"
                    required
                    fullWidth
                  />
                  <div className="flex">
                    <div className="w-1/2 mr-2">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          inputFormat="MM/yyyy"
                          views={['year', 'month']}
                          label="วันหมดอายุ ดด/ปปปป"
                          minDate={new Date()}
                          value={cardExpiryDate}
                          onChange={setCardExpiryDate}
                          onError={handleExpiryDateError}
                          onAccept={handleExpiryDateAccept}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              fullWidth
                              required
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="w-1/2">
                      <TextField
                        id="cardSecurityCode"
                        type="tel"
                        label="เลข CCV/CVV"
                        value={paymentData.cardSecurityCode}
                        onChange={handleChangeCardSecurityCode}
                        error={cardSecurityCodeInvalid}
                        helperText={
                          cardSecurityCodeInvalid
                            ? 'กรอกเลข CCV/CVV 3 หลัก'
                            : ''
                        }
                        variant="outlined"
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]{3}',
                          maxLength: 3,
                          placeholder: 'เลข CCV/CVV',
                        }}
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disableElevation
                  fullWidth
                  sx={{ marginTop: '1rem' }}
                  disabled={
                    !paymentData.cardNumber ||
                    !paymentData.cardHolderName ||
                    !cardExpiryDate ||
                    !paymentData.cardSecurityCode ||
                    cardNumberInvalid ||
                    cardHolderNameInvalid ||
                    cardExpiryDateInvalid ||
                    cardSecurityCodeInvalid
                  }
                >
                  ลงทะเบียนเรียน
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
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

export default Enroll;
