import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    appointment_date: "",
    doctor_id: "",
    patient_id: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/appointments/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.request(options);
        const appointment = response.data;

        setForm({
          appointment_date: appointment.appointment_date,
          doctor_id: appointment.doctor_id,
          patient_id: appointment.patient_id,
        });
      } catch (err) {
        console.log("Fetch appointment error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updatePatient = async () => {
    const options = {
      method: "PATCH",
      url: `https://ca2-med-api.vercel.app/appointments/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: form
    };

    try {
      await axios.request(options);
      navigate("/appointments");
    } catch (err) {
      console.log("Update appointment error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient();
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Edit Patient</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <Input name="appointment_date" value={form.appointment_date} onChange={handleChange} placeholder="Appointment Date" />
          <Input name="doctor_id" value={form.doctor_id} onChange={handleChange} placeholder="Doctor ID" />
          <Input name="patient_id" value={form.patient_id} onChange={handleChange} placeholder="Patient ID" />

        <Button className="mt-4" type="submit" variant="outline">
          Save Changes
        </Button>
      </form>
    </>
  );
}
