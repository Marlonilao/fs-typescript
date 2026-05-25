const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight * 10000) / (height * height);
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  else if (bmi < 17.0) return 'Underweight (Moderate thinness)';
  else if (bmi < 18.5) return 'Underweight (Mild thinness)';
  else if (bmi < 25.0) return 'Normal range';
  else if (bmi < 30.0) return 'Overweight (Pre-obesity)';
  else if (bmi < 35.0) return 'Overweight (Obesity Class I)';
  else if (bmi < 40.0) return 'Overweight (Obesity Class II)';
  else return 'Overweight (Obesity Class III)';
};

console.log(calculateBmi(180, 74));
