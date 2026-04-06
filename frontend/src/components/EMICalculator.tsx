import React, { useState } from 'react';
import { calculateEMI } from '../utils/DebtCalculators';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(10);

  const tenureMonths = tenureYears * 12;
  const emi = calculateEMI(loanAmount, interestRate, tenureMonths);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  const data = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Total Interest', value: totalInterest },
  ];

  const COLORS = ['var(--chart-line-secondary)', 'var(--chart-line-primary)'];

  const formatCurrency = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <div className="ultra-glass p-4 rounded-2xl mt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-base font-bold text-(--text-primary) mb-1 tracking-wide">EMI Calculator</h3>
          <p className="text-xs text-(--text-tertiary)">Calculate your monthly loan repayments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Loan Amount</span>
              <span className="font-mono font-bold text-(--text-primary)">{formatCurrency(loanAmount)}</span>
            </label>
            <input 
              type="range" 
              min="100000" 
              max="50000000" 
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Interest Rate (p.a)</span>
              <span className="font-mono font-bold text-(--text-primary)">{interestRate}%</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Loan Tenure (Years)</span>
              <span className="font-mono font-bold text-(--text-primary)">{tenureYears} Yr</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="30" 
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="var(--chart-grid)"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--chart-tooltip-bg)', borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)' }}
                  itemStyle={{ fontFamily: 'var(--font-mono)', color: 'var(--chart-tooltip-text)' }}
                  labelStyle={{ display: 'none' }}
                  formatter={(value: any) => `₹${Math.round(value as number).toLocaleString('en-IN')}`}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-(--text-tertiary) uppercase tracking-wider">Monthly EMI</span>
              <span className="text-xl font-bold text-(--text-primary) font-mono">{formatCurrency(emi)}</span>
            </div>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            <div className="bg-card-elevated p-3 rounded-xl border border-stroke-subtle text-center">
              <p className="text-xs text-(--text-tertiary) uppercase tracking-wider mb-1">Total Interest</p>
              <p className="text-sm font-bold text-(--text-primary) font-mono">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="bg-card-elevated p-3 rounded-xl border border-stroke-subtle text-center">
              <p className="text-xs text-(--text-tertiary) uppercase tracking-wider mb-1">Total Payment</p>
              <p className="text-sm font-bold text-(--text-primary) font-mono">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




