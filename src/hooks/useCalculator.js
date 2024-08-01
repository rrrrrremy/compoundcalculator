import { useState } from 'react';
import calculateTotalValue from '../utils/calculateTotalValue';

const useCalculator = () => {
  const [values, setValues] = useState({
    initialInvestment: '',
    annualInterestRate: '',
    inflationRate: '',
    years: '',
    regularDeposit: '',
    depositFrequency: 'Monthly',
    regularWithdrawal: '',
    withdrawalFrequency: 'Monthly',
    feeValue: '',
    feeType: 'percentage',
    feeFrequency: 'Annually',
    compoundingFrequency: 'Annually',
  });

  const handleNumberInput = (field) => (e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      setValues(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleChange = (field) => (e) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
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