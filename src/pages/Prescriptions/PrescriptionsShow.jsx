import { useEffect, useState } from "react";
import { api, setToken } from "@/utils/api";
import { useParams, Link } from "react-router-dom";

export default function PrescriptionsShow() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setToken(token);
    api.get(`/prescriptions/${id}`)
      .then(res => setPrescription(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!prescription) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Prescription</h1>
      <p><strong>Patient ID:</strong> {prescription.patientId}</p>
      <p><strong>Medication:</strong> {prescription.medication}</p>
      <Link to={`/prescriptions/${id}/edit`} className="text-blue-500 mt-4 inline-block">Edit Prescription</Link>
    </div>
  );
}
