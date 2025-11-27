import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from "@/components/ui/table";

export default function PatientsIndex() {
  const [prescriptions, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://ca2-med-api.vercel.app/prescriptions");
        setPatients(res.data);
      } catch (err) {
        console.log("Fetch prescriptions error:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <Button asChild variant="outline" className="mb-4 block">
        <Link to="/prescriptions/create">Create New Patient</Link>
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Doctor ID</TableHead>
            <TableHead>Diagnosis ID</TableHead>
            <TableHead>Medication</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {prescriptions.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell>{prescription.patient_id}</TableCell>
              <TableCell>{prescription.doctor_id}</TableCell>
              <TableCell>{prescription.diagnosis_id}</TableCell>
              <TableCell>{prescription.medication}</TableCell>
              <TableCell>{prescription.dosage}</TableCell>
              <TableCell>{prescription.start_date}</TableCell>
              <TableCell>{prescription.end_date}</TableCell>

              <TableCell>
                <Link className="text-blue-500" to={`/prescriptions/${prescription.id}`}>View</Link>
                {" | "}
                <Link className="text-green-500" to={`/prescriptions/${prescription.id}/edit`}>Edit</Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
