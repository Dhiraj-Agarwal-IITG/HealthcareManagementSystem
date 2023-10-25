import './App.css';
import Chat from './pages/Chat';
import Doctor from './pages/Doctor';
import Help from './pages/Help';
import Home from './pages/Home';
import MainHome from './pages/MainHome';
import Patient from './pages/Patient';
import AddPatient from './pages/AddPatient';
import { Routes, Route } from "react-router-dom"
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import Invoices from './pages/Invoices';
import AddAppointment from './pages/AddAppointment';
import Login from './pages/Login';
import { useState } from 'react';
import Signup from './pages/Signup';
import Otp from './pages/Otp';


function App() {
  const [role,setRole]=useState("patient");

  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<MainHome role={role} setRole={setRole} />} />
        <Route path="/login" element={<Login role={role} setRole={setRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='otp' element={<Otp/>}/>

        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/new" element={<AddPatient />} />
        <Route path="/appointment/new" element={<AddAppointment />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default App;
