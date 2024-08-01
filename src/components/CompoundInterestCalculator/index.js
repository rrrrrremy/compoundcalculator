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
      <div className={styles.glassPane}>
        <h1 className={styles.title}>Compound Interest Calculator</h1>
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
                <h2 className={styles.scenarioTitle}>Scenario 2</h2>
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
            <h3 className={styles.optionsTitle}>Options</h3>
            <button 
              className={styles.actionButton}
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide Comparison' : 'Compare Scenarios'}
            </button>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={calculator1.values.adjustForInflation}
                onChange={calculator1.handleChange('adjustForInflation')}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Adjust for Inflation</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;