import React from 'react';
import { frequencyOptions } from '../../utils/constants';
import styles from './styles.module.css';

const CalculatorInputs = ({ values, handleNumberInput, handleChange }) => (
  <div className={styles.calculatorInputs}>
    <div className={styles.inputGroup}>
      <label htmlFor="initialInvestment">Initial Investment ($)</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="initialInvestment"
          value={values.initialInvestment}
          onChange={handleNumberInput('initialInvestment')}
          min="0"
          step="0.01"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="regularDeposit">Regular Deposit ($)</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="regularDeposit"
          value={values.regularDeposit}
          onChange={handleNumberInput('regularDeposit')}
          min="0"
          step="0.01"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="depositFrequency">Deposit Frequency</label>
      <div className={styles.inputWrapper}>
        <select
          id="depositFrequency"
          value={values.depositFrequency}
          onChange={handleChange('depositFrequency')}
          className={styles.select}
        >
          {frequencyOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="annualInterestRate">Annual Interest Rate (%)</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="annualInterestRate"
          value={values.annualInterestRate}
          onChange={handleNumberInput('annualInterestRate')}
          min="0"
          max="100"
          step="0.01"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="years">Investment Period (Years)</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="years"
          value={values.years}
          onChange={handleNumberInput('years')}
          min="1"
          step="1"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="inflationRate">Inflation Rate (%)</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="inflationRate"
          value={values.inflationRate}
          onChange={handleNumberInput('inflationRate')}
          min="0"
          max="100"
          step="0.01"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="regularWithdrawal">Regular Withdrawal ($)</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="regularWithdrawal"
          value={values.regularWithdrawal}
          onChange={handleNumberInput('regularWithdrawal')}
          min="0"
          step="0.01"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="withdrawalFrequency">Withdrawal Frequency</label>
      <div className={styles.inputWrapper}>
        <select
          id="withdrawalFrequency"
          value={values.withdrawalFrequency}
          onChange={handleChange('withdrawalFrequency')}
          className={styles.select}
        >
          {frequencyOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="feeValue">Fee Value ({values.feeType === 'percentage' ? '%' : '$'})</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          id="feeValue"
          value={values.feeValue}
          onChange={handleNumberInput('feeValue')}
          min="0"
          step="0.01"
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="feeType">Fee Type</label>
      <div className={styles.inputWrapper}>
        <select
          id="feeType"
          value={values.feeType}
          onChange={handleChange('feeType')}
          className={styles.select}
        >
          <option value="fixed">Fixed Amount</option>
          <option value="percentage">Percentage</option>
        </select>
      </div>
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="feeFrequency">Fee Frequency</label>
      <div className={styles.inputWrapper}>
        <select
          id="feeFrequency"
          value={values.feeFrequency}
          onChange={handleChange('feeFrequency')}
          className={styles.select}
        >
          {frequencyOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default CalculatorInputs;