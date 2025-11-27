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
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/patients/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.request(options);
        const patient = response.data;

        setForm({
          first_name: patient.first_name,
          last_name: patient.last_name,
          date_of_birth: patient.date_of_birth,
          email: patient.email,
          phone: patient.phone
        });
      } catch (err) {
        console.log("Fetch patient error:", err);
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
      url: `https://ca2-med-api.vercel.app/patients/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: form
    };

    try {
      await axios.request(options);
      navigate("/patients");
    } catch (err) {
      console.log("Update patient error:", err);
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

        <Input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" />
        <Input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" />
        <Input name="date_of_birth" value={form.date_of_birth} onChange={handleChange} placeholder="Date of Birth" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

        <Button className="mt-4" type="submit" variant="outline">
          Save Changes
        </Button>
      </form>
    </>
  );
}
