import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency } from '../utils/formatters';

const ResultChart = ({ result, values }) => {
  const generateChartData = () => {
    const data = [];
    const { initialInvestment, years, regularDeposit, depositFrequency } = values;
    const depositsPerYear = getDepositsPerYear(depositFrequency);
    const monthlyDeposit = (regularDeposit * depositsPerYear) / 12;

    let balance = initialInvestment;
    let totalContributions = initialInvestment;

    for (let year = 0; year <= years; year++) {
      const yearlyDeposit = monthlyDeposit * 12;
      const interestEarned = result.totalInterestEarned * (year / years);
      balance = totalContributions + interestEarned;

      data.push({
        year,
        balance,
        contributions: totalContributions,
        interest: interestEarned,
      });

      totalContributions += yearlyDeposit;
    }

    return data;
  };

  const getDepositsPerYear = (frequency) => {
    const frequencyMap = {
      'Daily': 365,
      'Weekly': 52,
      'Bi-Weekly': 26,
      'Monthly': 12,
      'Quarterly': 4,
      'Bi-Annually': 2,
      'Annually': 1
    };
    return frequencyMap[frequency] || 12;
  };

  const formatYAxis = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };

  const chartData = generateChartData();

  return (
    <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-color)' }}>Investment Growth Over Time</h3>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year"
            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(value, name) => [formatCurrency(value), name]}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="contributions"
            stackId="1"
            stroke="#2ecc71"
            fill="#2ecc71"
            name="Contributions"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#3498db"
            fill="#3498db"
            name="Interest"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;