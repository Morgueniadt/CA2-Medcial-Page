import { useState, useEffect } from "react";
import { api, setToken } from "@/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AppointmentsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [appointment, setAppointment] = useState({ doctorId: "", patientId: "", date: "" });

  useEffect(() => {
    if (token) setToken(token);
    if (id) {
      api.get(`/appointments/${id}`)
        .then(res => setAppointment(res.data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = (e) => setAppointment({ ...appointment, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/appointments/${id}`, appointment);
      else await api.post("/appointments", appointment);
      navigate("/appointments");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Appointment" : "Add Appointment"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label>Doctor ID</Label>
          <Input name="doctorId" value={appointment.doctorId} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <Label>Patient ID</Label>
          <Input name="patientId" value={appointment.patientId} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <Label>Date & Time</Label>
          <Input name="date" type="datetime-local" value={appointment.date} onChange={handleChange} required />
        </div>
        <Button type="submit">{id ? "Update Appointment" : "Add Appointment"}</Button>
      </form>
    </div>
  );
}
