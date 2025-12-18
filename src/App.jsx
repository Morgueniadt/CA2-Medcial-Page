import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthForm from "@/components/AuthForm";
import DashboardLayout from "@/components/DashboardLayout";
import AdminPanel from "@/pages/Admin/AdminPanel";

import Doctors from "./pages/Doctors/Doctors";
import DoctorForm from "./pages/Doctors/DoctorForm";
import DoctorShow from "./pages/Doctors/DoctorShow";

import Diagnoses from "./pages/Diagnoses/Diagnoses";
import DiagnosisForm from "./pages/Diagnoses/DiagnosisForm";
import DiagnosisShow from "./pages/Diagnoses/DiagnosisShow";

import Appointments from "./pages/Appointments/Appointments";
import AppointmentsForm from "./pages/Appointments/AppointmentsForm";
import AppointmentsShow from "./pages/Appointments/AppointmentsShow";

import Prescriptions from "./pages/Prescriptions/Prescriptions";
import PrescriptionsForm from "./pages/Prescriptions/PrescriptionsForm";
import PrescriptionsShow from "./pages/Prescriptions/PrescriptionsShow";

import PatientShow from "./pages/PatientShow";
import PatientForm from "./pages/PatientForm";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // doctor / patient / admin
  const [token, setToken] = useState("");

  // Persist token & role from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken && savedRole) {
      setLoggedIn(true);
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const handleLogin = (status, tokenValue, userRole) => {
    setLoggedIn(status);
    setRole(userRole);
    setToken(tokenValue);
    if (status) {
      localStorage.setItem("token", tokenValue);
      localStorage.setItem("role", userRole);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!loggedIn) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />

        {/* Protected dashboard routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["doctor", "patient", "admin"]}>
              <DashboardLayout role={role} onLogout={() => handleLogin(false)} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Doctors />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/create" element={<DoctorForm />} />
          <Route path="doctors/:id" element={<DoctorShow />} />
          <Route path="doctors/:id/edit" element={<DoctorForm />} />

          <Route path="diagnoses" element={<Diagnoses />} />
          <Route path="diagnoses/create" element={<DiagnosisForm />} />
          <Route path="diagnoses/:id" element={<DiagnosisShow />} />
          <Route path="diagnoses/:id/edit" element={<DiagnosisForm />} />

          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/create" element={<AppointmentsForm />} />
          <Route path="appointments/:id" element={<AppointmentsShow />} />
          <Route path="appointments/:id/edit" element={<AppointmentsForm />} />

          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="prescriptions/create" element={<PrescriptionsForm />} />
          <Route path="prescriptions/:id" element={<PrescriptionsShow />} />
          <Route path="prescriptions/:id/edit" element={<PrescriptionsForm />} />
          <Route path="patients/:id" element={<PatientShow />} />
          <Route path="patients/:id/edit" element={<PatientForm />} />

          
          {/* Admin-only route */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}
