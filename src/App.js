import './App.css';
import Chat from './pages/Chat';
import Doctor from './pages/Doctor';
import Help from './pages/Help';
import Home from './pages/Home';
import MainHome from './pages/MainHome';
import AddPatient from './pages/AddPatient';
import { Routes, Route } from "react-router-dom"
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import AppointmentHistory from './pages/AppointmentHistory';
import AddAppointment from './pages/AddAppointment';
import Login from './pages/Login';
import { useState } from 'react';
import Signup from './pages/Signup';
<<<<<<< HEAD
=======
import UserProfile from './pages/userProfile';
>>>>>>> a67b1f87525e503df08099f52f104cfc2525437b
import Otp from './pages/Otp';


function App() {
  const [role, setRole] = useState("patient");

  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<MainHome role={role} setRole={setRole} />} />
        <Route
          path="/login"
          element={<Login role={role} />}
        />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
        <Route path='otp' element={<Otp/>}/>

        <Route path="/patient" element={<Patient />} />
=======
        <Route path="/otp" element={<Otp />} />
>>>>>>> a67b1f87525e503df08099f52f104cfc2525437b
        <Route path="/patient/new" element={<AddPatient />} />
        <Route
          path="/appointment/new"
          element={<AddAppointment />}
        />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/appointmentHistory" element={<AppointmentHistory />} />
        <Route path="/profile" element={<UserProfile role={role} />} />
      </Routes>
    </div>
  );
}

export default App;
