import { Link } from "react-router-dom";

export default function Sidebar({ onLogout, role }) {
  return (
    <div className="w-64 bg-white shadow p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">Clinic Dashboard</h1>
      <Link to="/doctors" className="hover:text-blue-500">Doctors</Link>
      <Link to="/patients" className="hover:text-blue-500">Patients</Link>
      <Link to="/appointments" className="hover:text-blue-500">Appointments</Link>
      <Link to="/diagnoses" className="hover:text-blue-500">Diagnoses</Link>
      <Link to="/prescriptions" className="hover:text-blue-500">Prescriptions</Link>
      {role === "admin" && <Link to="/admin" className="hover:text-red-500">Admin Panel</Link>}
      <button onClick={onLogout} className="mt-auto bg-red-500 text-white py-2 rounded">Logout</button>
    </div>
  );
}
