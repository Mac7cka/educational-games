import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="pb-24 lg:max-h-screen px-4 relative flex flex-col items-center justify-center lg:overflow-hidden xl:overflow-hidden">
      <img
        src="/bottom-image.svg"
        alt="bottom background with flowers and animals"
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
      />
      <main className="mx-auto max-w-7xl w-full flex-grow flex items-center justify-center lg:overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;