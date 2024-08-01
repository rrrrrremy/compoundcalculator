import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import styles from './styles.module.css';
import ResultChart from '../ResultChart';

const CalculatorResults = ({ result, values }) => {
  const {
    nominalValue,
    inflationAdjustedValue,
    totalContributions,
    totalWithdrawals,
    totalFees,
    totalInterestEarned
  } = result;

  const {
    initialInvestment,
    years,
    annualInterestRate,
    compoundingFrequency,
    inflationRate
  } = values;

  const frequencyToTimesPerYear = (frequency) => {
    const frequencyMap = {
      'Daily': 365,
      'Weekly': 52,
      'Bi-Weekly': 26,
      'Monthly': 12,
      'Quarterly': 4,
      'Bi-Annually': 2,
      'Annually': 1
    };
    return frequencyMap[frequency] || 1;
  };

  const n = frequencyToTimesPerYear(compoundingFrequency);
  const r = annualInterestRate / 100;
  const t = years;

  const equationExplanation = `A = P(1 + r/n)^(nt)`;
  const equationValues = `Where:
    A = Final amount
    P = Principal balance (Initial investment)
    r = Annual interest rate (${r.toFixed(4)})
    n = Number of times interest is compounded per year (${n})
    t = Number of years (${t})`;

  return (
    <div className={styles.result}>
      <h3 className={styles.resultTitle}>Investment Summary</h3>
      <div className={styles.summaryGrid}>
        <div className={styles.summaryItem}>
          <h4>Final Balance</h4>
          <p className={styles.mainValue}>{formatCurrency(nominalValue)}</p>
          <p className={styles.subValue}>
            Inflation Adjusted: {formatCurrency(inflationAdjustedValue)}
          </p>
        </div>
        <div className={styles.summaryItem}>
          <h4>Total Growth</h4>
          <p className={styles.mainValue}>{formatCurrency(nominalValue - initialInvestment - totalContributions + totalWithdrawals)}</p>
          <p className={styles.subValue}>
            {((nominalValue - initialInvestment - totalContributions + totalWithdrawals) / (initialInvestment + totalContributions) * 100).toFixed(2)}% total return
          </p>
        </div>
      </div>
      <div className={styles.breakdownTitle}>Detailed Breakdown</div>
      <div className={styles.breakdownSection}>
        <h5 className={styles.breakdownSubheading}>Initial Investment</h5>
        <div className={styles.breakdownItem}>
          <span>Initial Investment</span>
          <span>{formatCurrency(initialInvestment)}</span>
        </div>
      </div>
      <div className={styles.breakdownSection}>
        <h5 className={styles.breakdownSubheading}>Contributions and Withdrawals</h5>
        <div className={styles.breakdownItem}>
          <span>Total Contributions</span>
          <span>{formatCurrency(totalContributions)}</span>
        </div>
        <div className={styles.breakdownItem}>
          <span>Total Withdrawals</span>
          <span>{formatCurrency(totalWithdrawals)}</span>
        </div>
      </div>
      <div className={styles.breakdownSection}>
        <h5 className={styles.breakdownSubheading}>Fees</h5>
        <div className={styles.breakdownItem}>
          <span>Total Fees</span>
          <span>{formatCurrency(totalFees)}</span>
        </div>
      </div>
      <div className={styles.breakdownSection}>
        <h5 className={styles.breakdownSubheading}>Growth</h5>
        <div className={styles.breakdownItem}>
          <span>Total Interest Earned</span>
          <span>{formatCurrency(totalInterestEarned)}</span>
        </div>
      </div>
      
      <ResultChart result={result} values={values} />
      
      <div className={styles.equationSection}>
        <h4>Compound Interest Equation</h4>
        <p className={styles.equation}>{equationExplanation}</p>
        <p className={styles.equationValues}>{equationValues}</p>
        <p className={styles.equationNote}>Note: This equation represents the basic compound interest formula. The actual calculation in the app is more complex, accounting for regular deposits, withdrawals, fees, and inflation.</p>
      </div>
      <div className={styles.additionalInfo}>
        <p>Investment Period: {years} years</p>
        <p>Annual Interest Rate: {annualInterestRate}%</p>
        <p>Compounding Frequency: {compoundingFrequency}</p>
        <p>Inflation Rate: {inflationRate}%</p>
      </div>
    </div>
  );
};

export default CalculatorResults;