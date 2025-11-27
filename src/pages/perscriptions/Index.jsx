import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from "@/components/ui/table";

export default function PatientsIndex() {
  const [perscriptions, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://ca2-med-api.vercel.app/perscriptions");
        setPatients(res.data);
      } catch (err) {
        console.log("Fetch perscriptions error:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <Button asChild variant="outline" className="mb-4 block">
        <Link to="/perscriptions/create">Create New Patient</Link>
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
          {perscriptions.map((perscription) => (
            <TableRow key={perscription.id}>
              <TableCell>{perscription.patient_id}</TableCell>
              <TableCell>{perscription.doctor_id}</TableCell>
              <TableCell>{perscription.diagnosis_id}</TableCell>
              <TableCell>{perscription.medication}</TableCell>
              <TableCell>{perscription.dosage}</TableCell>
              <TableCell>{perscription.start_date}</TableCell>
              <TableCell>{perscription.end_date}</TableCell>

              <TableCell>
                <Link className="text-blue-500" to={`/perscriptions/${perscription.id}`}>View</Link>
                {" | "}
                <Link className="text-green-500" to={`/perscriptions/${perscription.id}/edit`}>Edit</Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
