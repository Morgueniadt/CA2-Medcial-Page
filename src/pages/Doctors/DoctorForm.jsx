import { useState, useEffect } from "react";
import { api, setToken } from "@/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [doctor, setDoctor] = useState({ name: "", email: "" });

  useEffect(() => {
    if (token) setToken(token);
    if (id) {
      api.get(`/doctors/${id}`)
        .then(res => setDoctor(res.data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = (e) => setDoctor({ ...doctor, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/doctors/${id}`, doctor);
      else await api.post("/doctors", doctor);
      navigate("/doctors");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Doctor" : "Add Doctor"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label>Name</Label>
          <Input name="name" value={doctor.name} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <Label>Email</Label>
          <Input name="email" type="email" value={doctor.email} onChange={handleChange} required />
        </div>
        <Button type="submit">{id ? "Update Doctor" : "Add Doctor"}</Button>
      </form>
    </div>
  );
}
