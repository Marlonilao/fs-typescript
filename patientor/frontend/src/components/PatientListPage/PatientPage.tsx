import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Patient } from '../../types';
import Entry from './Entry';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientInfo(id!);
      setPatient(patient);
      if (patient) {
        console.log('Success fetching patient info');
      }
    };

    fetchPatient();
    return () => {
      setPatient(null);
      console.log('set patient to null');
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
            patient.entries.map((entry) => <Entry entry={entry} />)
          ) : (
            <p>No entries yet</p>
          )}
        </div>
      </div>
    );
  }
};

export default PatientPage;
