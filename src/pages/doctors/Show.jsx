import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowDoctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/doctors/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctor(res.data);
      } catch (err) {
        console.log("Fetch doctor error:", err);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Doctor Details</h1>

      <p><strong>First Name:</strong> {doctor.first_name}</p>
      <p><strong>Last Name:</strong> {doctor.last_name}</p>
      <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phone}</p>
    </>
  );
}
