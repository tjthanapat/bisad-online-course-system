import React from 'react';
import './Loading.css';

const LoadingPage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-300 min-h-screen flex flex-col items-center justify-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="text-white">กำลังโหลด</p>
    </div>
  );
};

export default LoadingPage;
