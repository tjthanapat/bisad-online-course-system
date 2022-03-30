import React from 'react';

const Enroll = (props) => {
    const { course } = props;
    console.log(`You're enrolling course with id '${course.id}'`)

    return (
        <div className="bg-orange-400 min-h-screen flex items-center justify-center">
            <div>
                <h1 className="text-5xl font-bold text-white mb-5">Confirm Enroll</h1>
                <form>
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
