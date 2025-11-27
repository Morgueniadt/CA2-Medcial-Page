import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from "@/components/ui/table";

export default function PatientsIndex() {
  const [appointments, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://ca2-med-api.vercel.app/appointments");
        setPatients(res.data);
      } catch (err) {
        console.log("Fetch appointments error:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <Button asChild variant="outline" className="mb-4 block">
        <Link to="/appointments/create">Create New Patient</Link>
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Doctor ID</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.appointment_date}</TableCell>
              <TableCell>{appointment.doctor_id}</TableCell>
              <TableCell>{appointment.patient_id}</TableCell>

              <TableCell>
                <Link className="text-blue-500" to={`/appointments/${appointment.id}`}>View</Link>
                {" | "}
                <Link className="text-green-500" to={`/appointments/${appointment.id}/edit`}>Edit</Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
