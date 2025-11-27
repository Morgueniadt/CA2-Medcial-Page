import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from "@/components/ui/table";

export default function PatientsIndex() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://ca2-med-api.vercel.app/patients");
        setPatients(res.data);
      } catch (err) {
        console.log("Fetch patients error:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <Button asChild variant="outline" className="mb-4 block">
        <Link to="/patients/create">Create New Patient</Link>
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.first_name}</TableCell>
              <TableCell>{patient.last_name}</TableCell>
              <TableCell>{patient.date_of_birth}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>

              <TableCell>
                <Link className="text-blue-500" to={`/patients/${patient.id}`}>View</Link>
                {" | "}
                <Link className="text-green-500" to={`/patients/${patient.id}/edit`}>Edit</Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
