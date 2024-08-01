import { useState } from 'react';
import calculateTotalValue from '../utils/calculateTotalValue';

const initialState = {
  initialInvestment: 1000,
  annualInterestRate: 5,
  inflationRate: 2,
  years: 10,
  regularDeposit: 100,
  depositFrequency: 'Monthly',
  regularWithdrawal: 0,
  withdrawalFrequency: 'Monthly',
  feeValue: 50,
  feeType: 'fixed', // New field
  feeFrequency: 'Annually',
  adjustForInflation: false,
};

const useCalculator = () => {
  const [values, setValues] = useState(initialState);

  const handleNumberInput = (field) => (e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      setValues(prev => ({ ...prev, [field]: value === '' ? '' : Number(value) }));
    }
  };

  const handleChange = (field) => (e) => {
    setValues(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  };

  const result = calculateTotalValue(values);

  return {
    values,
    handleNumberInput,
    handleChange,
    result
  };
};

export default useCalculator;