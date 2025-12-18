import { useState, useEffect } from "react";
import { api, setToken } from "@/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PrescriptionsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [prescription, setPrescription] = useState({ patientId: "", medication: "" });

  useEffect(() => {
    if (token) setToken(token);
    if (id) {
      api.get(`/prescriptions/${id}`)
        .then(res => setPrescription(res.data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = (e) => setPrescription({ ...prescription, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/prescriptions/${id}`, prescription);
      else await api.post("/prescriptions", prescription);
      navigate("/prescriptions");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Prescription" : "Add Prescription"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label>Patient ID</Label>
          <Input name="patientId" value={prescription.patientId} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <Label>Medication</Label>
          <Input name="medication" value={prescription.medication} onChange={handleChange} required />
        </div>
        <Button type="submit">{id ? "Update Prescription" : "Add Prescription"}</Button>
      </form>
    </div>
  );
}
