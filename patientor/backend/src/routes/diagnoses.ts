import express, { type Response } from 'express';
import { getDiagnoses } from '../services/diagnosesService.ts';
import type { DiagnosesEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosesEntry[]>) => {
  res.send(getDiagnoses());
});

export default router;
