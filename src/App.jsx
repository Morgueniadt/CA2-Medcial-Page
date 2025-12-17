import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-600 text-white p-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Medical App</h2>
          <Link to="/doctors" className="hover:bg-gray-700 px-2 py-1 rounded">Doctors</Link>
          {/* Add more links for patients, appointments, etc. here */}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">
          {/* Header */}
          <header className="mb-4 border-b pb-2">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </header>

          {/* Routes */}
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
    </Router>
  );
}
