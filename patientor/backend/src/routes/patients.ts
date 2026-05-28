import express, { type Response } from 'express';
import { getNonsensitivePatients } from '../services/patientsService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(getNonsensitivePatients());
});

export default patientsRouter;
