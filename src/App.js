import './App.css';
import Navbar from './components/Navbar';
import NewPatient from './components/NewPatient';
import PatientRecords from './components/Patients/Records';
import DoctorAppoints from './components/Doctors/Appointments';

function App() {
  return (
    <div className="App">
      <Navbar />
      <PatientRecords/>
      <DoctorAppoints/>
    </div>
  );
}

export default App;
