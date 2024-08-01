import React, { useState } from 'react';
import CalculatorInputs from '../CalculatorInputs';
import CalculatorResults from '../CalculatorResults';
import useCalculator from '../../hooks/useCalculator';
import styles from './styles.module.css';

const CompoundInterestCalculator = () => {
  const [showComparison, setShowComparison] = useState(false);
  const calculator1 = useCalculator();
  const calculator2 = useCalculator();

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.titleContainer}>
        <h1>Compound Interest Calculator</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.calculatorWrapper}>
          <div className={styles.calculator}>
            <CalculatorInputs 
              values={calculator1.values} 
              handleNumberInput={calculator1.handleNumberInput} 
              handleChange={calculator1.handleChange}
            />
            <CalculatorResults 
              result={calculator1.result} 
              values={calculator1.values}
            />
          </div>
          {showComparison && (
            <div className={styles.calculator}>
              <h2>Scenario 2</h2>
              <CalculatorInputs 
                values={calculator2.values} 
                handleNumberInput={calculator2.handleNumberInput} 
                handleChange={calculator2.handleChange}
              />
              <CalculatorResults 
                result={calculator2.result} 
                values={calculator2.values}
              />
            </div>
          )}
        </div>
        <div className={styles.sideOptions}>
          <h3>More Options</h3>
          <button 
            className={styles.actionButton}
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? 'Hide Comparison' : 'Compare Scenarios'}
          </button>
          <label className={styles.actionButton}>
            <input
              type="checkbox"
              checked={calculator1.values.adjustForInflation}
              onChange={calculator1.handleChange('adjustForInflation')}
            />
            <span>Adjust for Inflation</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;