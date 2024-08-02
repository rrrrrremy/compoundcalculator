import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';
import styles from './styles.module.css';
import ResultChart from '../ResultChart';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const CalculatorResults = ({ result, values }) => {
  const [showDetails, setShowDetails] = useState(false);

  const {
    nominalValue,
    inflationAdjustedValue,
    totalContributions,
    totalWithdrawals,
    totalFees,
    totalInterestEarned,
    yearlyData
  } = result;

  const {
    initialInvestment,
    years,
    annualInterestRate,
    compoundingFrequency,
    inflationRate
  } = values;

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className={styles.result}>
      <div className={styles.resultTitle}>
        <CheckCircle size={24} className={styles.resultIcon} />
        <h3>Calculation Results</h3>
      </div>

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

      <button className={styles.toggleButton} onClick={toggleDetails}>
        <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
        {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {showDetails && (
        <div className={styles.detailedBreakdown}>
          <div className={styles.breakdownGrid}>
            <div className={styles.breakdownItem}>
              <span>Initial Investment</span>
              <span>{formatCurrency(initialInvestment)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Total Contributions</span>
              <span>{formatCurrency(totalContributions)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Total Withdrawals</span>
              <span>{formatCurrency(totalWithdrawals)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Total Fees</span>
              <span>{formatCurrency(totalFees)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Total Interest Earned</span>
              <span>{formatCurrency(totalInterestEarned)}</span>
            </div>
          </div>
          
          <div className={styles.additionalInfo}>
            <p>Investment Period: {years} years</p>
            <p>Annual Interest Rate: {annualInterestRate}%</p>
            <p>Compounding Frequency: {compoundingFrequency}</p>
            <p>Inflation Rate: {inflationRate}%</p>
          </div>
        </div>
      )}
      
      <ResultChart result={{ yearlyData }} />
    </div>
  );
};

export default CalculatorResults;