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
      nominalValue: 0,
      inflationAdjustedValue: 0,
      totalContributions: 0,
      totalWithdrawals: 0,
      totalFees: 0,
      totalInterestEarned: 0,
      yearlyData: []
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
  let totalInterestEarned = 0;

  let yearlyData = [{
    balance: initialInvestment,
    totalContributions: 0,
    totalInterestEarned: 0
  }];

  for (let month = 1; month <= totalMonths; month++) {
    const yearEnd = month % 12 === 0 || month === totalMonths;
    
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
      const interestEarned = balance * monthlyInterestRate;
      balance += interestEarned;
      totalInterestEarned += interestEarned;
    }

    // Ensure balance doesn't go negative
    balance = Math.max(0, balance);

    // Adjust for inflation
    inflationAdjustedBalance = balance / Math.pow(1 + monthlyInflationRate, month);

    if (yearEnd) {
      yearlyData.push({
        balance: balance,
        totalContributions: totalContributions,
        totalInterestEarned: totalInterestEarned
      });
    }
  }

  return {
    nominalValue: balance,
    inflationAdjustedValue: inflationAdjustedBalance,
    totalContributions,
    totalWithdrawals,
    totalFees,
    totalInterestEarned,
    yearlyData
  };
};

export default calculateTotalValue;