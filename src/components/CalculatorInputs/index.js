import React from 'react';
import { frequencyOptions } from '../../utils/constants';
import styles from './styles.module.css';

const InputGroup = ({ label, id, value, onChange, type = "number", min = "0", step = "0.01", options = null, placeholder = "" }) => (
  <div className={styles.inputGroup}>
    <label htmlFor={id}>{label}</label>
    {options ? (
      <select id={id} value={value} onChange={onChange} className={styles.select}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        className={styles.input}
        placeholder={placeholder}
      />
    )}
  </div>
);

const CalculatorInputs = ({ values, handleNumberInput, handleChange }) => (
  <div className={styles.calculatorInputs}>
    <div className={styles.inputSection}>
      <h3 className={styles.inputSectionHeading}>Investment</h3>
      <InputGroup
        label="Initial Investment ($)"
        id="initialInvestment"
        value={values.initialInvestment}
        onChange={handleNumberInput('initialInvestment')}
        placeholder="1000"
      />
      <InputGroup
        label="Regular Deposit ($)"
        id="regularDeposit"
        value={values.regularDeposit}
        onChange={handleNumberInput('regularDeposit')}
        placeholder="100"
      />
      <InputGroup
        label="Deposit Frequency"
        id="depositFrequency"
        value={values.depositFrequency}
        onChange={handleChange('depositFrequency')}
        options={frequencyOptions}
      />
    </div>

    <div className={styles.inputSection}>
      <h3 className={styles.inputSectionHeading}>Losses & Inflation</h3>
      <InputGroup
        label="Regular Withdrawal ($)"
        id="regularWithdrawal"
        value={values.regularWithdrawal}
        onChange={handleNumberInput('regularWithdrawal')}
        placeholder="0"
      />
      <InputGroup
        label="Withdrawal Frequency"
        id="withdrawalFrequency"
        value={values.withdrawalFrequency}
        onChange={handleChange('withdrawalFrequency')}
        options={frequencyOptions}
      />
      <InputGroup
        label="Inflation Rate (%)"
        id="inflationRate"
        value={values.inflationRate}
        onChange={handleNumberInput('inflationRate')}
        min="0"
        max="100"
        placeholder="2"
      />
    </div>

    <div className={styles.inputSection}>
      <h3 className={styles.inputSectionHeading}>Interest</h3>
      <InputGroup
        label="Annual Interest Rate (%)"
        id="annualInterestRate"
        value={values.annualInterestRate}
        onChange={handleNumberInput('annualInterestRate')}
        min="0"
        max="100"
        placeholder="5"
      />
      <InputGroup
        label="Compounding Frequency"
        id="compoundingFrequency"
        value={values.compoundingFrequency}
        onChange={handleChange('compoundingFrequency')}
        options={frequencyOptions}
      />
      <InputGroup
        label="Investment Period (Years)"
        id="years"
        value={values.years}
        onChange={handleNumberInput('years')}
        min="1"
        step="1"
        placeholder="10"
      />
    </div>

    <div className={styles.inputSection}>
      <h3 className={styles.inputSectionHeading}>Fees</h3>
      <InputGroup
        label={`Fee Value (${values.feeType === 'percentage' ? '%' : '$'})`}
        id="feeValue"
        value={values.feeValue}
        onChange={handleNumberInput('feeValue')}
        placeholder="0.5"
      />
      <InputGroup
        label="Fee Type"
        id="feeType"
        value={values.feeType}
        onChange={handleChange('feeType')}
        options={[
          { value: 'percentage', label: 'Percentage' },
          { value: 'fixed', label: 'Fixed Amount' }
        ]}
      />
      <InputGroup
        label="Fee Frequency"
        id="feeFrequency"
        value={values.feeFrequency}
        onChange={handleChange('feeFrequency')}
        options={frequencyOptions}
      />
    </div>
  </div>
);

export default CalculatorInputs;