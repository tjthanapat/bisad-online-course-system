import React, { useState } from 'react';
import { enrollment } from '../../functions/enroll';
import { useAuth } from '../../contexts/AuthContext';
import { Timestamp } from "firebase/firestore";

const Enroll = (props) => {
    const auth = useAuth();
    const { course } = props;
    const enrollmentData = {
        id: '',
        course_id: '',
        uid: '',
        enroll_price: '',
        timestamp: '',
        payment_type: ''
    }
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [enrollData, setEnrollData] = useState(enrollmentData);

    const handleSubmitEnroll = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const enrollDataExcludeId = {
                course_id: course.id,
                uid: auth.user.uid,
                enroll_price: course.price,
                timestamp: Timestamp.now(),
                payment_type: "Credit"
            };
            await enrollment(enrollData.id, enrollDataExcludeId);
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert(err.message);
        }
    };
    return (
        <div className="bg-orange-400 min-h-screen flex items-center justify-center">
            <div>
                <h1 className="text-5xl font-bold text-white mb-5">Confirm Enroll</h1>
                <h3 className="text-2xl font-bold text-white mb-5">You're enrolling course <span className='text-red-600'>{course.name}</span></h3>
                <form onSubmit={handleSubmitEnroll}>
                    <div>
                        <input
                            type="text"
                            className="rounded p-2"
                            id="cardNumber"
                            placeholder="Card Number"
                        />
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="rounded p-2"
                            id="cardName"
                            placeholder="Name on card"
                        />
                    </div>
                    <div className="mt-3">
                        <input
                            type="date"
                            className="rounded p-2"
                            id="expire"
                            placeholder="Expiry Date"
                        />
                    </div>
                    <div className="mt-3">
                        <input
                            type="password"
                            className="rounded p-2"
                            id="cvc"
                            placeholder="cvc"
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

    )

}

export default Enroll;
