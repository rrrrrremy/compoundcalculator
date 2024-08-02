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

const ResultChart = ({ result }) => {
  const generateChartData = () => {
    if (!result || !result.yearlyData || !Array.isArray(result.yearlyData)) {
      console.error("Invalid result object format");
      return [];
    }

    return result.yearlyData.map((yearData, index) => ({
      year: index + 1,
      balance: yearData.balance || 0,
      contributions: yearData.totalContributions || 0,
      interest: yearData.totalInterestEarned || 0
    }));
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

  if (chartData.length === 0) {
    return <div>No data available for chart</div>;
  }

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
            // Remove any defaultProps usage
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
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#e74c3c"
            fill="#e74c3c"
            name="Total Balance"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;