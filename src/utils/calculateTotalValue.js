import frequencyToTimesPerYear from './frequencyToTimesPerYear';

const calculateTotalValue = ({
  initialInvestment,
  annualInterestRate = 0,
  inflationRate = 0,
  years,
  regularDeposit = 0,
  depositFrequency = 'Annually',
  regularWithdrawal = 0,
  withdrawalFrequency = 'Annually',
  feeValue = 0,
  feeType = 'fixed',
  feeFrequency = 'Annually',
  compoundingFrequency = 'Annually'
}) => {
  // Input validation
  if (isNaN(initialInvestment) || isNaN(annualInterestRate) || isNaN(inflationRate) ||
      isNaN(years) || isNaN(regularDeposit) || isNaN(regularWithdrawal) || isNaN(feeValue)) {
    console.error("Invalid input values");
    return {
      nominalValue: NaN,
      inflationAdjustedValue: NaN,
      totalContributions: NaN,
      totalWithdrawals: NaN,
      totalFees: NaN,
      totalInterestEarned: NaN
    };
  }

  // Initialization
  let balance = Math.max(0, initialInvestment);
  let inflationAdjustedBalance = balance;

  // Convert frequencies to annual equivalents
  const depositsPerYear = frequencyToTimesPerYear(depositFrequency);
  const withdrawalsPerYear = frequencyToTimesPerYear(withdrawalFrequency);
  const feesPerYear = frequencyToTimesPerYear(feeFrequency);
  const compoundingsPerYear = frequencyToTimesPerYear(compoundingFrequency);

  // Rate calculations
  const monthlyInflationRate = (inflationRate / 100) / 12;
  const effectiveAnnualRate = Math.pow(1 + annualInterestRate / 100 / compoundingsPerYear, compoundingsPerYear) - 1;
  const monthlyInterestRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1;

  const totalMonths = Math.max(0, years * 12);

  let totalContributions = 0;
  let totalWithdrawals = 0;
  let totalFees = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Calculate the number of times deposits should be applied per month
    const depositsThisMonth = (depositsPerYear / 12);
    if (depositsThisMonth > 0) {
      const depositThisMonth = regularDeposit * depositsThisMonth;
      if (!isNaN(depositThisMonth) && depositThisMonth > 0) {
        balance += depositThisMonth;
        totalContributions += depositThisMonth;
      }
    }

    // Calculate the number of times withdrawals should be applied per month
    const withdrawalsThisMonth = (withdrawalsPerYear / 12);
    if (withdrawalsThisMonth > 0) {
      const withdrawalThisMonth = Math.min(regularWithdrawal * withdrawalsThisMonth, balance);
      if (!isNaN(withdrawalThisMonth) && withdrawalThisMonth > 0) {
        balance -= withdrawalThisMonth;
        totalWithdrawals += withdrawalThisMonth;
      }
    }

    // Calculate the number of times fees should be applied per month
    const feesThisMonth = (feesPerYear / 12);
    if (feesThisMonth > 0) {
      let feeThisMonth = 0;
      if (feeType === 'percentage') {
        feeThisMonth = balance * feeValue / 100 * feesThisMonth;
      } else {
        feeThisMonth = Math.min(feeValue * feesThisMonth, balance);
      }
      if (!isNaN(feeThisMonth) && feeThisMonth > 0) {
        balance -= feeThisMonth;
        totalFees += feeThisMonth;
      }
    }

    // Apply compound interest
    if (!isNaN(monthlyInterestRate) && monthlyInterestRate > 0) {
      balance *= (1 + monthlyInterestRate);
    }

    // Ensure balance doesn't go negative
    balance = Math.max(0, balance);

    // Adjust for inflation
    inflationAdjustedBalance = balance / Math.pow(1 + monthlyInflationRate, month);
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
