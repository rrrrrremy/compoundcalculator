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
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setValues(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleChange = (field) => (e) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  // Parsing inputs as numbers before calculation
  const parsedValues = {
    ...values,
    initialInvestment: parseFloat(values.initialInvestment) || 0,
    annualInterestRate: parseFloat(values.annualInterestRate) || 0,
    inflationRate: parseFloat(values.inflationRate) || 0,
    years: parseFloat(values.years) || 0,
    regularDeposit: parseFloat(values.regularDeposit) || 0,
    regularWithdrawal: parseFloat(values.regularWithdrawal) || 0,
    feeValue: parseFloat(values.feeValue) || 0,
  };

  const result = calculateTotalValue(parsedValues);

  return {
    values,
    handleNumberInput,
    handleChange,
    result
  };
};

export default useCalculator;
