import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Diagnosis, Patient } from '../../types';
import Entry from './Entry';

const PatientPage = ({ diagnosis }: { diagnosis: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientInfo(id!);
      setPatient(patient);
    };

    fetchPatient();
    return () => {
      setPatient(null);
    };
  }, [id]);

  if (patient) {
    return (
      <div>
        <h1>{patient.name}</h1>
        <p>Gender: {patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>Date of Birth: {patient.dateOfBirth}</p>

        <div>
          <h2>Entries</h2>
          {patient.entries.length > 0 ? (
            patient.entries.map((entry) => (
              <Entry entry={entry} key={entry.id} diagnosis={diagnosis} />
            ))
          ) : (
            <p>No entries yet</p>
          )}
        </div>
      </div>
    );
  }
};

export default PatientPage;
