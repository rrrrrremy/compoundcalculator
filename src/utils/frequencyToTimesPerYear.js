const frequencyToTimesPerYear = (frequency) => {
  switch (frequency) {
    case 'Daily': return 365;
    case 'Weekly': return 52;
    case 'Bi-Weekly': return 26;
    case 'Monthly': return 12;
    case 'Bi-Monthly': return 6;
    case 'Quarterly': return 4;
    case 'Bi-Annually': return 2;
    case 'Annually': return 1;
    case 'Bi-Yearly': return 0.5;
    case 'Quinquennially': return 0.2;
    default: return 1; // Default to annually if an unknown frequency is provided
  }
};

export default frequencyToTimesPerYear;
