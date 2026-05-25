interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  target: number;
  dailyExercises: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyExercises = args.slice(3).map((num) => Number(num));

  if (!isNaN(target) && !dailyExercises.some(isNaN)) {
    return {
      target,
      dailyExercises,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (
  args: number[],
  target: number,
): ExerciseResults => {
  const periodLength = args.length;
  const trainingDays = args.filter((arg) => arg > 0).length;
  const average = args.reduce((sum, arg) => sum + arg, 0) / periodLength;
  const success = average >= target;
  let rating: number;
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

try {
  const { target, dailyExercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
