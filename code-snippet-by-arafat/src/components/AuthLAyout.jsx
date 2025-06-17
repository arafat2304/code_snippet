import React from "react";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
