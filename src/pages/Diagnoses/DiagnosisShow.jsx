import { useEffect, useState } from "react";
import { api, setToken } from "@/utils/api";
import { useParams, Link } from "react-router-dom";

export default function DiagnosisShow() {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setToken(token);
    api.get(`/diagnoses/${id}`)
      .then(res => setDiagnosis(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!diagnosis) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Diagnosis</h1>
      <p><strong>Patient ID:</strong> {diagnosis.patientId}</p>
      <p><strong>Description:</strong> {diagnosis.description}</p>
      <Link to={`/diagnoses/${id}/edit`} className="text-blue-500 mt-4 inline-block">Edit Diagnosis</Link>
    </div>
  );
}
