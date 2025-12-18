import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import AuthForm from "@/components/AuthForm";
import DashboardLayout from "@/components/DashboardLayout";
import AdminPanel from "@/pages/AdminPanel";

import Doctors from "./pages/Doctors";
import DoctorForm from "./pages/DoctorForm";
import DoctorShow from "./pages/DoctorShow";

import Diagnoses from "./pages/Diagnoses";
import DiagnosisForm from "./pages/DiagnosisForm";
import DiagnosisShow from "./pages/DiagnosisShow";

import Appointments from "./pages/Appointments";
import AppointmentsForm from "./pages/AppointmentsForm";
import AppointmentsShow from "./pages/AppointmentsShow";

import Prescriptions from "./pages/Prescriptions";
import PrescriptionsForm from "./pages/PrescriptionsForm";
import PrescriptionsShow from "./pages/PrescriptionsShow";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // doctor / patient / admin
  const [token, setToken] = useState("");

  const handleLogin = (status, tokenValue, userRole) => {
    setLoggedIn(status);
    setRole(userRole);
    setToken(tokenValue);
    if (status) localStorage.setItem("token", tokenValue);
    else localStorage.removeItem("token");
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

        {/* Dashboard routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
