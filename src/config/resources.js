export const resources = {
  patients: {
    label: "Patients",
    endpoint: "https://ca2-med-api.vercel.app/patients",
    fields: [
      { name: "first_name", label: "First Name", type: "text" },
      { name: "last_name", label: "Last Name", type: "text" },
      { name: "date_of_birth", label: "Date of Birth", type: "date" }
    ]
  },

  doctors: {
    label: "Doctors",
    endpoint: "https://ca2-med-api.vercel.app/doctors",
    fields: [
      { name: "first_name", label: "First Name", type: "text" },
      { name: "last_name", label: "Last Name", type: "text" },
      { name: "specialisation", label: "Specialisation", type: "text", enumValues: ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Psychiatry"] },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" }
    ]
  },

  appointments: {
    label: "Appointments",
    endpoint: "https://ca2-med-api.vercel.app/appointments",
    fields: [
      { name: "patient_id", label: "Patient ID", type: "number", apiEndpoint: "https://ca2-med-api.vercel.app/patients" },
      { name: "doctor_id", label: "Doctor ID", type: "number", apiEndpoint: "https://ca2-med-api.vercel.app/doctors" },
      { name: "appointment_date", label: "Appointment Date", type: "date" }
    ]
  },

  prescriptions: {
    label: "Prescriptions",
    endpoint: "https://ca2-med-api.vercel.app/prescriptions",
    fields: [
      { name: "patient_id", label: "Patient ID", type: "number", apiEndpoint: "https://ca2-med-api.vercel.app/patients" },
      { name: "doctor_id", label: "Doctor ID", type: "number", apiEndpoint: "https://ca2-med-api.vercel.app/doctors" },
      { name: "medication", label: "Medication", type: "text" },
      { name: "dosage", label: "Dosage", type: "text" }
    ]
  },

  diagnosis: {
    label: "Diagnosis",
    endpoint: "https://ca2-med-api.vercel.app/diagnosis",
    fields: [
      { name: "patient_id", label: "Patient ID", type: "number", apiEndpoint: "https://ca2-med-api.vercel.app/patients" },
      { name: "description", label: "Description", type: "text" }
    ]
  }
};
