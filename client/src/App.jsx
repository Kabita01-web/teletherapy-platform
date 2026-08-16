import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Therapists from "./pages/Therapists";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import Sessions from "./pages/dashboard/Sessions";
import Messages from "./pages/dashboard/Messages";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/landing/Layout";
import ScrollToTop from "./components/landing/ScrollToTop";

// Placeholder Therapist Detail
const TherapistDetailPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
    <h1 className="text-3xl font-headline-lg text-primary">
      Therapist Profile
    </h1>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Pages with Navbar + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route
              path="/therapists/:id"
              element={<TherapistDetailPlaceholder />}
            />
          </Route>

          {/* Authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected pages — sidebar layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<ClientDashboard />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:conversationId" element={<Messages />} />
            </Route>

            <Route
              path="/book/:id"
              element={
                <div className="p-10 text-center">Booking flow coming soon</div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
