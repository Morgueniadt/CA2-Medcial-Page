import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router";

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    specialisation: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/doctors/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.request(options);
        const doctor = response.data;

        setForm({
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          specialisation: doctor.specialisation,
          email: doctor.email,
          phone: doctor.phone
        });
      } catch (err) {
        console.log("Fetch doctor error:", err);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateDoctor = async () => {
    const options = {
      method: "PATCH",
      url: `https://ca2-med-api.vercel.app/doctors/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: form
    };

    try {
      await axios.request(options);
      navigate("/doctors");
    } catch (err) {
      console.log("Update doctor error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDoctor();
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Edit Doctor</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <Input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" />
        <Input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" />
        <Input name="specialisation" value={form.specialisation} onChange={handleChange} placeholder="Specialisation" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

        <Button className="mt-4" type="submit" variant="outline">
          Save Changes
        </Button>
      </form>
    </>
  );
}
