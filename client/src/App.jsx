import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Therapists from './pages/Therapists';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder Dashboard component
const DashboardPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
    <h1 className="text-3xl font-headline-lg text-primary">Dashboard</h1>
    <p className="ml-4">You are logged in!</p>
  </div>
);

// Placeholder Therapist Detail
const TherapistDetailPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
    <h1 className="text-3xl font-headline-lg text-primary">Therapist Profile</h1>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/therapists/:id" element={<TherapistDetailPlaceholder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPlaceholder />} />
            <Route path="/book/:id" element={<div className="p-10 text-center">Booking flow coming soon</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
