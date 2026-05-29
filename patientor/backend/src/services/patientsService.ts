import patientsEntries from '../../data/patientsData.ts';
import type {
  NonSensitivePatientsEntry,
  PatientsEntry,
  NewPatientEntry,
} from '../types.ts';
import { v1 as uuid } from 'uuid';

export const getPatients = (): PatientsEntry[] => {
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

export const addPatient = (patient: NewPatientEntry): PatientsEntry => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patientsEntries.push(newPatient);
  return newPatient;
};
