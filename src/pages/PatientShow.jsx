import { useEffect, useState } from "react";
import { api, setToken } from "@/utils/api";
import { useParams, Link } from "react-router-dom";

export default function PatientShow() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setToken(token);
    api.get(`/patients/${id}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{patient.name}</h1>
      <p><strong>Email:</strong> {patient.email}</p>
      <Link to={`/patients/${id}/edit`} className="text-blue-500 mt-4 inline-block">Edit Patient</Link>
    </div>
  );
}
