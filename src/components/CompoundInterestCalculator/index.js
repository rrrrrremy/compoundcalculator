import React, { useState, useCallback } from 'react';
import CalculatorInputs from '../CalculatorInputs';
import CalculatorResults from '../CalculatorResults';
import useCalculator from '../../hooks/useCalculator';
import { formatCurrency } from '../../utils/formatters';
import styles from './styles.module.css';

const MAX_SCENARIOS = 5; // Maximum number of scenarios

const CompoundInterestCalculator = () => {
  const calculator1 = useCalculator();
  const calculator2 = useCalculator();
  const calculator3 = useCalculator();
  const calculator4 = useCalculator();
  const calculator5 = useCalculator();

  const calculators = [calculator1, calculator2, calculator3, calculator4, calculator5];

  const [state, setState] = useState({
    activeScenarios: 1,
    activeScenario: 0,
    showInfoModal: false
  });

  const addScenario = useCallback(() => {
    setState(prev => {
      if (prev.activeScenarios < MAX_SCENARIOS) {
        return {
          ...prev,
          activeScenarios: prev.activeScenarios + 1,
          activeScenario: prev.activeScenarios
        };
      }
      return prev;
    });
  }, []);

  const removeScenario = useCallback((index) => {
    setState(prev => {
      if (prev.activeScenarios > 1) {
        const newActiveScenarios = prev.activeScenarios - 1;
        const newActiveScenario = prev.activeScenario >= index
          ? Math.max(0, prev.activeScenario - 1)
          : prev.activeScenario;

        return {
          ...prev,
          activeScenarios: newActiveScenarios,
          activeScenario: newActiveScenario
        };
      }
      return prev;
    });
  }, []);

  const setActiveScenario = useCallback((index) => {
    setState(prev => ({ ...prev, activeScenario: index }));
  }, []);

  const toggleInfoModal = useCallback(() => {
    setState(prev => ({ ...prev, showInfoModal: !prev.showInfoModal }));
  }, []);

  const InfoModal = () => (
    <div className={styles.modalOverlay} onClick={toggleInfoModal}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>Compound Interest Calculator Information</h2>
        {/* ... (keep the existing content) ... */}
        <button className={styles.closeButton} onClick={toggleInfoModal}>Close</button>
      </div>
    </div>
  );

  const ScenarioTabs = () => (
    <div className={styles.scenarioTabs}>
      {calculators.slice(0, state.activeScenarios).map((_, index) => (
        <button
          key={index}
          className={`${styles.scenarioTab} ${state.activeScenario === index ? styles.activeTab : ''}`}
          onClick={() => setActiveScenario(index)}
        >
          Scenario {index + 1}
          {state.activeScenarios > 1 && (
            <span className={styles.removeScenario} onClick={(e) => { e.stopPropagation(); removeScenario(index); }}>
              ×
            </span>
          )}
        </button>
      ))}
      {state.activeScenarios < MAX_SCENARIOS && (
        <button className={styles.addScenarioButton} onClick={addScenario}>+</button>
      )}
    </div>
  );

  const ComparisonSummary = () => {
    if (state.activeScenarios < 2) return null;

    const baseScenario = calculators[0].result;
    return (
      <div className={styles.comparisonSummary}>
        <h3>Comparison Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Final Balance</th>
              <th>Difference</th>
              <th>% Difference</th>
            </tr>
          </thead>
          <tbody>
            {calculators.slice(0, state.activeScenarios).map((calculator, index) => {
              const diff = calculator.result.nominalValue - baseScenario.nominalValue;
              const percentDiff = (diff / baseScenario.nominalValue) * 100;
              return (
                <tr key={index}>
                  <td>Scenario {index + 1}</td>
                  <td>{formatCurrency(calculator.result.nominalValue)}</td>
                  <td>{formatCurrency(diff)}</td>
                  <td>{percentDiff.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.glassPane}>
        <h1 className={styles.title}>Compound Interest Calculator</h1>
        <ScenarioTabs />
        <div className={styles.mainContent}>
          <div className={styles.calculatorWrapper}>
            {calculators.slice(0, state.activeScenarios).map((calculator, index) => (
              <div key={index} className={`${styles.calculator} ${state.activeScenario === index ? styles.activeCalculator : styles.inactiveCalculator}`}>
                <CalculatorInputs 
                  values={calculator.values} 
                  handleNumberInput={calculator.handleNumberInput} 
                  handleChange={calculator.handleChange}
                />
                <CalculatorResults 
                  result={calculator.result} 
                  values={calculator.values}
                />
              </div>
            ))}
          </div>
          <div className={styles.sideOptions}>
            <h3 className={styles.optionsTitle}>Options</h3>
            <button 
              className={styles.actionButton}
              onClick={toggleInfoModal}
            >
              Info
            </button>
          </div>
        </div>
        <ComparisonSummary />
      </div>
      {state.showInfoModal && <InfoModal />}
    </div>
  );
};

export default CompoundInterestCalculator;