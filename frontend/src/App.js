import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddItem from './components/AddItem/AddItem';
import AppointmentForm from './components/AppointmenetForm/AppointmentForm';
import ItemList from './components/ItemList';
import SkinCareChatbot from './components/SkinCareChatbot';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login  from './components/Login';
import UserProfile  from './components/UserProfile';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminDashboard from './components/AdminDashboard';
import SkinProgressChart from './components/SkinProgressChart';
import SkinProgressForm from './components/SkinProgressForm';
import DoctorForm from './components/DoctorForm';
import Doctor  from './components/Doctor';
import AdminAppointments from './components/AdminAppoiments';
import './styles/main.css';

function App() {
  return (
    <div className="auralisse-app">
      {/* Header appears on all pages */}
      <Header />
      
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/appointments" element={<AppointmentForm />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/chatbot" element={<SkinCareChatbot />} />
          <Route path="/SkinProgressChart" element={<SkinProgressChart />} />
          <Route path="/SkinProgressForm" element={<SkinProgressForm />} />
          <Route path="/doctorForm" element={<DoctorForm />} />
          <Route path="/adminAppoinments" element={<AdminAppointments />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        </main>
      
      
      
      {/* Footer appears on all pages */}
      <Footer />
    </div>
  );
}

export default App;