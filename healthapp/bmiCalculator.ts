interface BmiValue {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValue => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight * 10000) / (height * height);
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  else if (bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25.0) {
    return 'Normal range';
  } else if (bmi < 30.0) {
    return 'Overweight (Pre-obesity)';
  } else if (bmi < 35.0) {
    return 'Overweight (Obesity Class I)';
  } else if (bmi < 40.0) {
    return 'Overweight (Obesity Class II)';
  } else {
    return 'Overweight (Obesity Class III)';
  }
};

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateBmi };
