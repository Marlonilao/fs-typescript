import express, { type Response } from 'express';
import {
  getNonsensitivePatients,
  addPatient,
  getPatientInfo,
  addEntryToPatient,
} from '../services/patientsService.ts';
import type { NonSensitivePatient } from '../types.ts';
import { NewPatientSchema, NewEntrySchema } from '../types.ts';
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

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const addedEntry = addEntryToPatient(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default patientsRouter;
