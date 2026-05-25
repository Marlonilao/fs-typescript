interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  args: number[],
  target: number,
): ExerciseResults => {
  const periodLength = args.length;
  const trainingDays = args.filter((arg) => arg > 0).length;
  const average = args.reduce((sum, arg) => sum + arg, 0) / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Good! Target met or exceeded';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'STOP BEING LAZY AND DO SOME EXERCISE';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
