export const resources = {
  patients: {
    label: "Patients",
    endpoint: "https://ca2-med-api.vercel.app/patients",
    fields: [
      { name: "first_name", label: "First Name", type: "text" },
      { name: "last_name", label: "Last Name", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" }
    ]
  },

  doctors: {
    label: "Doctors",
    endpoint: "https://ca2-med-api.vercel.app/doctors",
    fields: [
      { name: "first_name", label: "First Name", type: "text" },
      { name: "last_name", label: "Last Name", type: "text" },
      { name: "specialty", label: "Specialty", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" }
    ]
  },

  appointments: {
    label: "Appointments",
    endpoint: "https://ca2-med-api.vercel.app/appointments",
    fields: [
      { name: "patient_id", label: "Patient ID", type: "number" },
      { name: "doctor_id", label: "Doctor ID", type: "number" },
      { name: "date", label: "Appointment Date", type: "date" }
    ]
  },

  prescriptions: {
    label: "Prescriptions",
    endpoint: "https://ca2-med-api.vercel.app/prescriptions",
    fields: [
      { name: "patient_id", label: "Patient ID", type: "number" },
      { name: "doctor_id", label: "Doctor ID", type: "number" },
      { name: "medication", label: "Medication", type: "text" },
      { name: "dosage", label: "Dosage", type: "text" }
    ]
  },

  diagnosis: {
    label: "Diagnosis",
    endpoint: "https://ca2-med-api.vercel.app/diagnosis",
    fields: [
      { name: "patient_id", label: "Patient ID", type: "number" },
      { name: "description", label: "Description", type: "text" }
    ]
  }
};
