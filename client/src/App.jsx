import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Therapists from "./pages/Therapists";
import TherapistDetail from "./pages/TherapistDetail";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import Sessions from "./pages/dashboard/Sessions";
import Messages from "./pages/dashboard/Messages";
import Assessments from "./pages/dashboard/Assessments";
import AssessmentForm from "./pages/dashboard/AssessmentForm";
import AssessmentDetail from "./pages/dashboard/AssessmentDetail";
import Resources from "./pages/dashboard/Resources";
import ResourceDetail from "./pages/dashboard/ResourceDetail";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/landing/Layout";
import ScrollToTop from "./components/landing/ScrollToTop";

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
            <Route path="/therapists/:id" element={<TherapistDetail />} />
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
              <Route path="/assessments" element={<Assessments />} />
              <Route
                path="/assessments/take/:templateKey"
                element={<AssessmentForm />}
              />
              <Route path="/assessments/:id" element={<AssessmentDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:id" element={<ResourceDetail />} />
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
