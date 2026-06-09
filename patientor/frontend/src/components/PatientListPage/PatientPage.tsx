import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Diagnosis, Patient, EntryFormValues } from '../../types';
import Entry from './Entry';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';
import { Box, Button } from '@mui/material';

const PatientPage = ({ diagnosis }: { diagnosis: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const subtmitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(id!, values);
      console.log(entry);
      setPatient({
        ...patient!,
        entries: patient!.entries.concat(entry),
      });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e.response.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            '',
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  if (patient) {
    return (
      <div>
        <h1>{patient.name}</h1>
        <p>Gender: {patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>Date of Birth: {patient.dateOfBirth}</p>

        <div>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <h2>Entries</h2>{' '}
            <Button
              type='button'
              variant='contained'
              size='small'
              onClick={() => openModal()}
            >
              Add New Entry
            </Button>
          </Box>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={subtmitNewEntry}
            error={error}
            onClose={closeModal}
          />
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
