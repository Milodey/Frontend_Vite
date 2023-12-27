//app.jsx


import './App.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Search from './pages/Search';
import MIS from './pages/MIS';
import AllUsers from './pages/Alluser';
import Pending from './pages/Pending';
import AdminRegister from './pages/AdminRegistration';
import ErrorPage from './pages/ErrorPage';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full h-screen space-y-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<Search />} />
            <Route path='/mis' element={<MIS />} />
            <Route path='/all' element={<AllUsers />} />
            <Route path='/pending' element={<Pending />} />
            <Route path='/adminregister' element={<AdminRegister />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
