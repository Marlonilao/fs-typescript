import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const rawExercises = req.body.dailyExercises;

  if (!target || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  if (!Array.isArray(rawExercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const dailyExercises = rawExercises.map((num: unknown) => Number(num));

  if (dailyExercises.some(isNaN)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(dailyExercises, Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
