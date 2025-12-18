import { useEffect, useState } from "react";
import { api, setToken } from "@/utils/api";
import { useParams, Link } from "react-router-dom";

export default function DoctorShow() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setToken(token);
    api.get(`/doctors/${id}`)
      .then(res => setDoctor(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{doctor.name}</h1>
      <p><strong>Email:</strong> {doctor.email}</p>
      <Link to={`/doctors/${id}/edit`} className="text-blue-500 mt-4 inline-block">Edit Doctor</Link>
    </div>
  );
}
