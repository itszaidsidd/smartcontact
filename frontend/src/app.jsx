import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './app.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import DashboardHome from './components/DashboardHome'
import ViewContacts from './components/ViewContacts'
import AddContact from './components/AddContact'
import Profile from './components/Profile'
import Settings from './components/Settings'
import UpdateContact from './components/UpdateContact'
import ContactDetail from './components/ContactDetail'
import About from './components/About'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("basicToken");
  return token ? children : <Navigate to="/login" />;
};

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About/>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="contacts" element={<ViewContacts />} />
          <Route path="add-contact" element={<AddContact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="update-contact/:cid" element={<UpdateContact/>} />
          <Route path="contact/:cid" element={<ContactDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
