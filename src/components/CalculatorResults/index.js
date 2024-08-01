import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import styles from './styles.module.css';

const CalculatorResults = ({ result, values }) => {
  const {
    nominalValue,
    inflationAdjustedValue,
    totalContributions,
    totalWithdrawals,
    totalFees,
    totalInterestEarned
  } = result;

  const initialInvestment = values.initialInvestment;
  const years = values.years;

  return (
    <div className={styles.result}>
      <h3>Investment Summary</h3>
      <div className={styles.resultGrid}>
        <div className={styles.resultItem}>
          <h4>Final Balance</h4>
          <p className={styles.totalValue}>{formatCurrency(nominalValue)}</p>
        </div>
        {values.adjustForInflation && (
          <div className={styles.resultItem}>
            <h4>Inflation Adjusted Value</h4>
            <p className={styles.totalValue}>{formatCurrency(inflationAdjustedValue)}</p>
          </div>
        )}
        <div className={styles.resultItem}>
          <h4>Initial Investment</h4>
          <p>{formatCurrency(initialInvestment)}</p>
        </div>
        <div className={styles.resultItem}>
          <h4>Total Contributions</h4>
          <p>{formatCurrency(totalContributions)}</p>
        </div>
        <div className={styles.resultItem}>
          <h4>Total Withdrawals</h4>
          <p>{formatCurrency(totalWithdrawals)}</p>
        </div>
        <div className={styles.resultItem}>
          <h4>Total Fees ({values.feeType === 'percentage' ? '%' : 'Fixed'})</h4>
          <p>{formatCurrency(totalFees)}</p>
        </div>
        <div className={styles.resultItem}>
          <h4>Total Interest Earned</h4>
          <p>{formatCurrency(totalInterestEarned)}</p>
        </div>
      </div>
      <div className={styles.resultBreakdown}>
        <h4>Final Balance Breakdown</h4>
        <div className={styles.breakdownChart}>
          <div 
            className={`${styles.breakdownBar} ${styles.initialInvestment}`}
            style={{width: `${(initialInvestment / nominalValue) * 100}%`}}
            title={`Initial Investment: ${formatCurrency(initialInvestment)}`}
          ></div>
          <div 
            className={`${styles.breakdownBar} ${styles.contributions}`}
            style={{width: `${(totalContributions / nominalValue) * 100}%`}}
            title={`Total Contributions: ${formatCurrency(totalContributions)}`}
          ></div>
          <div 
            className={`${styles.breakdownBar} ${styles.interest}`}
            style={{width: `${(totalInterestEarned / nominalValue) * 100}%`}}
            title={`Total Interest Earned: ${formatCurrency(totalInterestEarned)}`}
          ></div>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <p>Investment Period: {years} years</p>
        <p>Annual Interest Rate: {values.annualInterestRate}%</p>
        <p>Inflation Rate: {values.inflationRate}%</p>
      </div>
    </div>
  );
};

export default CalculatorResults;