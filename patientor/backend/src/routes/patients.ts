import express, { type Response } from 'express';
import {
  getNonsensitivePatients,
  addPatient,
} from '../services/patientsService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';
import { NewPatientSchema } from '../types.ts';
import { z } from 'zod';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(getNonsensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default patientsRouter;
