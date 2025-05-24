// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Liste from './pages/Membres/Liste';
import UpComing from './pages/Events/UpComing';
import AjouterAdherent from './pages/Membres/Ajouter';
import Profil from './pages/Membres/Profil';
import AddEvent from './pages/Events/AddEvent';
import EditProfile from './pages/Membres/EditProfile';
import Annonces from './pages/Annonces/ListeAnnonce';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/membres/liste" element={<Liste />} />
        <Route path="/membres/ajouter" element={<AjouterAdherent />} />
        <Route path="/membres/profil/:id" element={<Profil />} />
        <Route path="/membres/edit-profile" element={<EditProfile />} />
        <Route path="/events/upcoming" element={<UpComing />} />
        <Route path="/events/new" element={<AddEvent />} />
        <Route path="/annonces" element={<Annonces />} />
      </Routes>
    </Router>
  );
}

export default App;
