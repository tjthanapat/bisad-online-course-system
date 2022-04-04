import React, { useState } from 'react';
import { enroll } from '../../functions/enroll';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Enroll = (props) => {
  const auth = useAuth();
  const { course, enrolled, setEnrolled } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const paymentDataDefault = {
    cardNumber: '',
    cardHolderName: '',
    cardCVC: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
  };
  const [paymentData, setPaymentData] = useState(paymentDataDefault);

  const handleChangePaymentDataInput = (event) => {
    setPaymentData({ ...paymentData, [event.target.id]: event.target.value });
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
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  } else if (success) {
    return (
      <div>
        <p>Enrolled successfully.</p>
        <Link to={`/course/${course.id}`}>Back to course page.</Link>
      </div>
    );
  } else if (!!error) {
    return <p>{error.message}</p>;
  } else if (auth.user.admin) {
    return <p>Admin cannot enroll to the course.</p>;
  } else if (enrolled) {
    return (
      <div>
        <p>You've already enrolled to this course.</p>
        <Link to={`/course/${course.id}`}>Back to course page.</Link>
      </div>
    );
  } else {
    return (
      <div className="bg-orange-400 min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-5xl font-bold text-white mb-5">Enroll</h1>
          <h3 className="text-2xl font-bold text-white mb-5">
            You're enrolling course{' '}
            <span className="text-red-600">{course.name}</span>
          </h3>
          <form onSubmit={handleSubmitEnroll}>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="cardNumber"
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={handleChangePaymentDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="cardHolderName">Cardholder Name</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="cardHolderName"
                placeholder="Card Number"
                value={paymentData.cardHolderName}
                onChange={handleChangePaymentDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="cardExpirationMonth">Expiration Month</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="cardExpirationMonth"
                placeholder="Expiration Month"
                value={paymentData.cardExpirationMonth}
                onChange={handleChangePaymentDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="cardExpirationYear">Expiration Year</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="cardExpirationYear"
                placeholder="Expiration Year"
                value={paymentData.cardExpirationYear}
                onChange={handleChangePaymentDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="cardCVC">CVC</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="cardCVC"
                placeholder="CVC"
                value={paymentData.cardCVC}
                onChange={handleChangePaymentDataInput}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Enroll;
