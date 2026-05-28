import diagnosesEntries from '../../data/diagnosesData.ts';
import type { DiagnosesEntry } from '../types.ts';

export const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesEntries;
};
