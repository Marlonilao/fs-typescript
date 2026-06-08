import patientsEntries from '../../data/patientsData.ts';
import type {
  NonSensitivePatient,
  NewPatientEntry,
  Patient,
  NewEntry,
  Entry,
} from '../types.ts';
import { v1 as uuid } from 'uuid';

export const getPatients = (): Patient[] => {
  return patientsEntries;
};

export const getNonsensitivePatients = (): NonSensitivePatient[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

export const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patientsEntries.push(newPatient);
  return newPatient;
};

export const getPatientInfo = (id: string): Patient => {
  const patient = patientsEntries.find((patient) => patient.id === id);

  if (!patient) throw new Error('Missing id/patient');

  return {
    ...patient,
  };
};

export const addEntryToPatient = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patientsEntries.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error('Missing patient/wrong id');
  }

  patient.entries.push(newEntry);
  return newEntry;
};
