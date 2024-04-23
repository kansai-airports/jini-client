import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import UserContext from './helpers/UserContext';

import App from './pages/App'; // Your home page component
import Login from './pages/Login'; // Your login page component
import NotFound from './pages/NotFound'; // A not found page component

const Main = () => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          // <Route path="/" element={user?.logged ? <App /> : <Login />} />
          <Route path="/" element={ <App />} />
          // <Route path="/login" element={<Login />} />
          <Route element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default Main;
