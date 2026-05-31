import patientsEntries from '../../data/patientsData.ts';
import type {
  NonSensitivePatientsEntry,
  PatientEntry,
  NewPatientEntry,
} from '../types.ts';
import { v1 as uuid } from 'uuid';

export const getPatients = (): PatientEntry[] => {
  return patientsEntries;
};

export const getNonsensitivePatients = (): NonSensitivePatientsEntry[] => {
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

export const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patientsEntries.push(newPatient);
  return newPatient;
};
