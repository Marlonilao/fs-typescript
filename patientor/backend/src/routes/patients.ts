import express, { type Response } from 'express';
import {
  getNonsensitivePatients,
  addPatient,
  getPatientInfo,
} from '../services/patientsService.ts';
import type { NonSensitivePatient } from '../types.ts';
import { NewPatientSchema } from '../types.ts';
import { z } from 'zod';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
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

patientsRouter.get('/:id', (req, res) => {
  try {
    const patient = getPatientInfo(req.params.id);
    res.json(patient);
  } catch (error: unknown) {
    let errMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errMessage);
  }
});

export default patientsRouter;
