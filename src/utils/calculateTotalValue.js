import frequencyToTimesPerYear from './frequencyToTimesPerYear';

const calculateDeposit = (month, regularDeposit, depositsPerYear) => {
  if (depositsPerYear >= 12) {
    return regularDeposit * depositsPerYear / 12;
  } else {
    const monthsBetweenDeposits = 12 / depositsPerYear;
    return (month % monthsBetweenDeposits === 1) ? regularDeposit : 0;
  }
};

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
  compoundingFrequency
}) => {
  let balance = Math.max(0, initialInvestment);
  let inflationAdjustedBalance = balance;
  
  const depositsPerYear = frequencyToTimesPerYear(depositFrequency);
  const withdrawalsPerYear = frequencyToTimesPerYear(withdrawalFrequency);
  const feesPerYear = frequencyToTimesPerYear(feeFrequency);
  const compoundingsPerYear = frequencyToTimesPerYear(compoundingFrequency);

  const monthlyInflationRate = inflationRate / 100 / 12;
  const effectiveAnnualRate = Math.pow(1 + annualInterestRate / 100 / compoundingsPerYear, compoundingsPerYear) - 1;
  const monthlyInterestRate = Math.pow(1 + effectiveAnnualRate, 1/12) - 1;

  const totalMonths = years * 12;

  let totalContributions = 0;
  let totalWithdrawals = 0;
  let totalFees = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Apply deposits
    const depositThisMonth = calculateDeposit(month, regularDeposit, depositsPerYear);
    balance += depositThisMonth;
    totalContributions += depositThisMonth;

    // Apply withdrawals
    const withdrawalCount = Math.floor(month * withdrawalsPerYear / 12) - Math.floor((month - 1) * withdrawalsPerYear / 12);
    if (balance > 0) {
      const actualWithdrawal = Math.min(regularWithdrawal * withdrawalCount, balance);
      balance -= actualWithdrawal;
      totalWithdrawals += actualWithdrawal;
    }

    // Apply fees
    const feeCount = Math.floor(month * feesPerYear / 12) - Math.floor((month - 1) * feesPerYear / 12);
    if (balance > 0 && feeCount > 0) {
      const fee = feeType === 'percentage' 
        ? (balance * feeValue / 100) * feeCount
        : Math.min(feeValue * feeCount, balance);
      balance -= fee;
      totalFees += fee;
    }

    // Apply compound interest
    balance *= (1 + monthlyInterestRate);

    // Ensure balance doesn't go negative
    balance = Math.max(0, balance);

    // Adjust for inflation
    inflationAdjustedBalance = balance / Math.pow(1 + monthlyInflationRate, month);

    // If balance reaches zero, break the loop
    if (balance === 0) {
      break;
    }
  }

  const totalInterestEarned = balance - initialInvestment - totalContributions + totalWithdrawals + totalFees;

  return {
    nominalValue: balance,
    inflationAdjustedValue: inflationAdjustedBalance,
    totalContributions,
    totalWithdrawals,
    totalFees,
    totalInterestEarned
  };
};

export default calculateTotalValue;