import frequencyToTimesPerYear from './frequencyToTimesPerYear';

const calculateTotalValue = ({
  initialInvestment,
  annualInterestRate,
  inflationRate,
  years,
  regularDeposit,
  depositFrequency,
  regularWithdrawal,
  withdrawalFrequency,
  feeValue,
  feeType,
  feeFrequency,
  adjustForInflation
}) => {
  let nominalValue = initialInvestment;
  let inflationAdjustedValue = initialInvestment;
  const monthlyRate = (annualInterestRate / 100) / 12;
  const monthlyInflationRate = (inflationRate / 100) / 12;
  const totalMonths = years * 12;
  
  const depositsPerYear = frequencyToTimesPerYear(depositFrequency);
  const withdrawalsPerYear = frequencyToTimesPerYear(withdrawalFrequency);
  const feesPerYear = frequencyToTimesPerYear(feeFrequency);

  const daysInYear = 365.25; // Account for leap years
  const depositInterval = daysInYear / depositsPerYear;
  const withdrawalInterval = daysInYear / withdrawalsPerYear;
  const feeInterval = daysInYear / feesPerYear;

  let daysPassed = 0;
  let totalContributions = 0;
  let totalWithdrawals = 0;
  let totalFees = 0;

  for (let month = 1; month <= totalMonths; month++) {
    let monthlyDeposit = 0;
    let monthlyWithdrawal = 0;
    let monthlyFee = 0;

    // Calculate deposits, withdrawals, and fees for this month
    for (let day = 0; day < 30.44; day++) { // Average days in a month
      daysPassed++;
      
      if (Math.floor(daysPassed / depositInterval) > Math.floor((daysPassed - 1) / depositInterval)) {
        monthlyDeposit += regularDeposit;
        totalContributions += regularDeposit;
      }
      
      if (Math.floor(daysPassed / withdrawalInterval) > Math.floor((daysPassed - 1) / withdrawalInterval)) {
        monthlyWithdrawal += regularWithdrawal;
        totalWithdrawals += regularWithdrawal;
      }
      
      if (Math.floor(daysPassed / feeInterval) > Math.floor((daysPassed - 1) / feeInterval)) {
        const fee = feeType === 'percentage' ? (nominalValue * feeValue / 100) : feeValue;
        monthlyFee += fee;
        totalFees += fee;
      }
    }

    // Apply monthly interest
    const interestEarned = nominalValue * monthlyRate;
    nominalValue += interestEarned;
    inflationAdjustedValue *= (1 + monthlyRate);

    // Apply deposit
    nominalValue += monthlyDeposit;
    inflationAdjustedValue += monthlyDeposit;

    // Apply withdrawal
    nominalValue -= monthlyWithdrawal;
    inflationAdjustedValue -= monthlyWithdrawal;

    // Apply fee
    nominalValue -= monthlyFee;
    inflationAdjustedValue -= monthlyFee;

    // Apply inflation adjustment
    if (adjustForInflation) {
      inflationAdjustedValue /= (1 + monthlyInflationRate);
    }

    // Ensure the value doesn't go below zero
    nominalValue = Math.max(0, nominalValue);
    inflationAdjustedValue = Math.max(0, inflationAdjustedValue);

    // If the value reaches zero, break the loop
    if (nominalValue === 0) {
      break;
    }
  }

  const totalInterestEarned = nominalValue - initialInvestment - totalContributions + totalWithdrawals + totalFees;

  return {
    nominalValue,
    inflationAdjustedValue,
    totalContributions,
    totalWithdrawals,
    totalFees,
    totalInterestEarned
  };
};

export default calculateTotalValue;