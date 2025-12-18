import { useState, useEffect } from "react";
import { api, setToken } from "@/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DiagnosisForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [diagnosis, setDiagnosis] = useState({ patientId: "", description: "" });

  useEffect(() => {
    if (token) setToken(token);
    if (id) {
      api.get(`/diagnoses/${id}`)
        .then(res => setDiagnosis(res.data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = (e) => setDiagnosis({ ...diagnosis, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/diagnoses/${id}`, diagnosis);
      else await api.post("/diagnoses", diagnosis);
      navigate("/diagnoses");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Diagnosis" : "Add Diagnosis"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label>Patient ID</Label>
          <Input name="patientId" value={diagnosis.patientId} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <Label>Description</Label>
          <Input name="description" value={diagnosis.description} onChange={handleChange} required />
        </div>
        <Button type="submit">{id ? "Update Diagnosis" : "Add Diagnosis"}</Button>
      </form>
    </div>
  );
}
