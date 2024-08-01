import React, { useState } from 'react';
import CalculatorInputs from '../CalculatorInputs';
import CalculatorResults from '../CalculatorResults';
import useCalculator from '../../hooks/useCalculator';
import styles from './styles.module.css';

const CompoundInterestCalculator = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const calculator1 = useCalculator();
  const calculator2 = useCalculator();

  const InfoModal = () => (
    <div className={styles.modalOverlay} onClick={() => setShowInfoModal(false)}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>Compound Interest Calculator Information</h2>
        <p>This calculator helps you understand the power of compound interest and how your investments can grow over time. Here's what each section does:</p>
        <ul>
          <li><strong>Investment:</strong> Enter your initial investment amount and any regular deposits you plan to make.</li>
          <li><strong>Losses & Inflation:</strong> Account for regular withdrawals and the impact of inflation on your investment's value.</li>
          <li><strong>Interest:</strong> Set your expected annual interest rate, compounding frequency, and investment period.</li>
          <li><strong>Fees:</strong> Include any fees associated with your investment, which can significantly impact long-term growth.</li>
        </ul>
        <p>The calculator provides a detailed breakdown of your investment's growth, including the effects of compound interest, regular contributions, withdrawals, fees, and inflation.</p>
        <p>Use the "Compare Scenarios" feature to see how different investment strategies or market conditions might affect your results.</p>
        <button className={styles.closeButton} onClick={() => setShowInfoModal(false)}>Close</button>
      </div>
    </div>
  );

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
              <div className={styles.resultsSeparator}>
                <hr className={styles.separatorLine} />
                <span className={styles.separatorText}>Results</span>
              </div>
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
                <div className={styles.resultsSeparator}>
                  <hr className={styles.separatorLine} />
                  <span className={styles.separatorText}>Results</span>
                </div>
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
            <button 
              className={styles.actionButton}
              onClick={() => setShowInfoModal(true)}
            >
              Info
            </button>
          </div>
        </div>
      </div>
      {showInfoModal && <InfoModal />}
    </div>
  );
};

export default CompoundInterestCalculator;