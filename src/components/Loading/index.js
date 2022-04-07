import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="bg-orange-400 min-h-screen flex flex-col items-center justify-center">
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

export default Loading;
