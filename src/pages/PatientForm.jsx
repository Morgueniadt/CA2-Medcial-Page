import { useState, useEffect } from "react";
import { api, setToken } from "@/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PatientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [patient, setPatient] = useState({ name: "", email: "" });

  useEffect(() => {
    if (token) setToken(token);
    if (id) {
      api.get(`/patients/${id}`)
        .then(res => setPatient(res.data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/patients/${id}`, patient);
      else await api.post("/patients", patient);
      navigate("/patients");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Patient" : "Add Patient"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label>Name</Label>
          <Input name="name" value={patient.name} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <Label>Email</Label>
          <Input name="email" type="email" value={patient.email} onChange={handleChange} required />
        </div>
        <Button type="submit">{id ? "Update Patient" : "Add Patient"}</Button>
      </form>
    </div>
  );
}
