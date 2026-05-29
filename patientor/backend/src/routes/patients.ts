import express, { type Response } from 'express';
import {
  getNonsensitivePatients,
  addPatient,
} from '../services/patientsService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';
import { parseNewPatientEntry } from '../utils.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(getNonsensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatientEntry(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
