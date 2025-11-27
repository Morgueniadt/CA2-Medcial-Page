import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from "@/components/ui/table";

export default function PatientsIndex() {
  const [diagnoses, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://ca2-med-api.vercel.app/diagnoses");
        setPatients(res.data);
      } catch (err) {
        console.log("Fetch diagnoses error:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <Button asChild variant="outline" className="mb-4 block">
        <Link to="/diagnoses/create">Create New Patient</Link>
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Diagnosis Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {diagnoses.map((diagnosis) => (
            <TableRow key={diagnosis.id}>
              <TableCell>{diagnosis.patient_id}</TableCell>
              <TableCell>{diagnosis.condition}</TableCell>
              <TableCell>{diagnosis.diagnosis_date}</TableCell>

              <TableCell>
                <Link className="text-blue-500" to={`/diagnoses/${diagnosis.id}`}>View</Link>
                {" | "}
                <Link className="text-green-500" to={`/diagnoses/${diagnosis.id}/edit`}>Edit</Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
