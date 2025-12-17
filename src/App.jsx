import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  const navLink =
    "block px-3 py-2 rounded transition hover:bg-gray-700 hover:translate-x-1";

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed md:static z-20 w-64 bg-gray-800 text-white p-4 
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <h2 className="text-xl font-bold mb-6">Medical App</h2>

          <nav className="flex flex-col gap-1">
            <Link to="/doctors" className={navLink}>Doctors</Link>
            <Link to="/diagnoses" className={navLink}>Diagnoses</Link>
            <Link to="/appointments" className={navLink}>Appointments</Link>
            <Link to="/prescriptions" className={navLink}>Prescriptions</Link>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 md:hidden z-10"
          />
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow p-4 flex items-center justify-between">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden bg-gray-200 px-3 py-2 rounded"
            >
              ☰
            </button>

            <h1 className="text-2xl font-bold">Dashboard</h1>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 animate-fade-in">
            <Routes>
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/create" element={<DoctorForm />} />
              <Route path="/doctors/:id" element={<DoctorShow />} />
              <Route path="/doctors/:id/edit" element={<DoctorForm />} />

              <Route path="/diagnoses" element={<Diagnoses />} />
              <Route path="/diagnoses/create" element={<DiagnosisForm />} />
              <Route path="/diagnoses/:id" element={<DiagnosisShow />} />
              <Route path="/diagnoses/:id/edit" element={<DiagnosisForm />} />

              <Route path="/appointments" element={<Appointments />} />
              <Route path="/appointments/create" element={<AppointmentsForm />} />
              <Route path="/appointments/:id" element={<AppointmentsShow />} />
              <Route path="/appointments/:id/edit" element={<AppointmentsForm />} />

              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/prescriptions/create" element={<PrescriptionsForm />} />
              <Route path="/prescriptions/:id" element={<PrescriptionsShow />} />
              <Route path="/prescriptions/:id/edit" element={<PrescriptionsForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
