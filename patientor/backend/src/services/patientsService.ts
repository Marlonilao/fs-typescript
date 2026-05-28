import patientsEntries from '../../data/patientsData.ts';
import type { NonSensitivePatientsEntry, PatientsEntry } from '../types.ts';

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
