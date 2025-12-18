import { useEffect, useState } from "react";
import { api, setToken } from "@/utils/api";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setToken(token);
    api.get("/doctors").then(res => setDoctors(res.data)).catch(err => console.error(err));
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    try {
      await api.delete(`/doctors/${id}`);
      setDoctors(doctors.filter(d => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Doctors</h1>
      <Link to="/doctors/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Doctor</Link>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doc => (
            <tr key={doc.id} className="border-b">
              <td className="p-2">{doc.id}</td>
              <td className="p-2">{doc.name}</td>
              <td className="p-2">{doc.email}</td>
              <td className="p-2 flex gap-2">
                <Link to={`/doctors/${doc.id}`} className="text-blue-500">View</Link>
                <Link to={`/doctors/${doc.id}/edit`} className="text-green-500">Edit</Link>
                <button onClick={() => handleDelete(doc.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
