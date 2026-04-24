import React, { useState } from 'react';
import { Calculator, TrendingUp, Calendar, Plus, Minus } from 'lucide-react';

interface Debt {
  name: string;
  principal: number;
  annual_roi: number;
  monthly_emi: number;
  duration_months: number;
  is_tax_deductible: boolean;
  loan_type: string;
}

interface Asset {
  name: string;
  current_value: number;
  expected_annual_return: number;
  monthly_contribution: number;
  asset_type: string;
}

interface FinancialProfile {
  monthly_income: number;
  age: number;
  tax_bracket_percentage: number;
  rent_mortgage: number;
  utilities_bills: number;
  food_groceries: number;
  transport_fuel: number;
  insurance_premiums: number;
  healthcare_medical: number;
  education_fees: number;
  lifestyle_luxuries: number;
  shopping_miscellaneous: number;
  debts: Debt[];
  assets: Asset[];
  optimization_mode: string;
  monthly_extra_buffer: number;
  emergency_fund_goal_months: number;
}

interface AnalysisResult {
  daily_interest_leak: number;
  months_saved: number;
  interest_saved: number;
  neutral_date: string;
  status: string;
}

export const WealthPortfolioAnalyzer: React.FC = () => {
  const [profile, setProfile] = useState<FinancialProfile>({
    monthly_income: 95000,
    age: 27,
    tax_bracket_percentage: 20,
    rent_mortgage: 18000,
    utilities_bills: 4500,
    food_groceries: 8000,
    transport_fuel: 4000,
    insurance_premiums: 2500,
    healthcare_medical: 1500,
    education_fees: 0,
    lifestyle_luxuries: 12000,
    shopping_miscellaneous: 5000,
    debts: [
      {
        name: "Toxic Credit Card",
        principal: 85000,
        annual_roi: 42.0,
        monthly_emi: 4500,
        duration_months: 24,
        is_tax_deductible: false,
        loan_type: "Unsecured"
      },
      {
        name: "HDFC Personal Loan",
        principal: 250000,
        annual_roi: 14.5,
        monthly_emi: 8500,
        duration_months: 36,
        is_tax_deductible: false,
        loan_type: "Unsecured"
      },
      {
        name: "SBI Home Loan",
        principal: 1500000,
        annual_roi: 8.5,
        monthly_emi: 14500,
        duration_months: 180,
        is_tax_deductible: true,
        loan_type: "Mortgage"
      }
    ],
    assets: [
      {
        name: "Emergency Savings",
        current_value: 45000,
        expected_annual_return: 4.5,
        monthly_contribution: 1000,
        asset_type: "Cash"
      },
      {
        name: "Index Fund (Equity)",
        current_value: 120000,
        expected_annual_return: 12.0,
        monthly_contribution: 5000,
        asset_type: "Equity"
      }
    ],
    optimization_mode: "Avalanche",
    monthly_extra_buffer: 5000,
    emergency_fund_goal_months: 6,
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const addDebt = () => {
    setProfile(prev => ({
      ...prev,
      debts: [...prev.debts, {
        name: '',
        principal: 0,
        annual_roi: 0,
        monthly_emi: 0,
        duration_months: 0,
        is_tax_deductible: false,
        loan_type: '',
      }],
    }));
  };

  const updateDebt = (index: number, field: keyof Debt, value: any) => {
    setProfile(prev => ({
      ...prev,
      debts: prev.debts.map((debt, i) =>
        i === index ? { ...debt, [field]: value } : debt
      ),
    }));
  };

  const removeDebt = (index: number) => {
    setProfile(prev => ({
      ...prev,
      debts: prev.debts.filter((_, i) => i !== index),
    }));
  };

  const addAsset = () => {
    setProfile(prev => ({
      ...prev,
      assets: [...prev.assets, {
        name: '',
        current_value: 0,
        expected_annual_return: 0,
        monthly_contribution: 0,
        asset_type: '',
      }],
    }));
  };

  const updateAsset = (index: number, field: keyof Asset, value: any) => {
    setProfile(prev => ({
      ...prev,
      assets: prev.assets.map((asset, i) =>
        i === index ? { ...asset, [field]: value } : asset
      ),
    }));
  };

  const removeAsset = (index: number) => {
    setProfile(prev => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v3/analyze-wealth-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ daily_interest_leak: 0, months_saved: 0, interest_saved: 0, neutral_date: '', status: 'Error' });
    }
    setLoading(false);
  };

  const formatCurrency = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <div className="ultra-glass p-4 rounded-2xl mt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-base font-bold text-(--text-primary) mb-1 tracking-wide">Wealth Portfolio Analyzer</h3>
          <p className="text-xs text-(--text-tertiary)">Analyze your financial health and optimize debt repayment strategy.</p>
        </div>
        <Calculator className="w-6 h-6 text-(--text-secondary)" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Financial Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Monthly Income</span>
              <span className="font-mono font-bold text-(--text-primary)">{formatCurrency(profile.monthly_income)}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={profile.monthly_income}
              onChange={(e) => setProfile(prev => ({ ...prev, monthly_income: Number(e.target.value) }))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Age</span>
              <span className="font-mono font-bold text-(--text-primary)">{profile.age} years</span>
            </label>
            <input
              type="range"
              min="18"
              max="65"
              step="1"
              value={profile.age}
              onChange={(e) => setProfile(prev => ({ ...prev, age: Number(e.target.value) }))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Tax Bracket</span>
              <span className="font-mono font-bold text-(--text-primary)">{profile.tax_bracket_percentage}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={profile.tax_bracket_percentage}
              onChange={(e) => setProfile(prev => ({ ...prev, tax_bracket_percentage: Number(e.target.value) }))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Optimization Mode</span>
              <span className="font-mono font-bold text-(--text-primary)">{profile.optimization_mode}</span>
            </label>
            <select
              value={profile.optimization_mode}
              onChange={(e) => setProfile(prev => ({ ...prev, optimization_mode: e.target.value }))}
              className="w-full bg-transparent border border-(--glass-border) rounded-lg px-3 py-2 text-(--text-primary) text-sm focus:outline-none focus:ring-1 focus:ring-(--emerald-core)"
            >
              <option value="Avalanche">Avalanche (Highest Interest)</option>
              <option value="Snowball">Snowball (Lowest Balance)</option>
            </select>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div>
          <h4 className="text-sm font-semibold text-(--text-primary) mb-4">Monthly Expenses</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'rent_mortgage', label: 'Rent/Mortgage', min: 0, max: 100000, step: 1000 },
              { name: 'utilities_bills', label: 'Utilities/Bills', min: 0, max: 20000, step: 500 },
              { name: 'food_groceries', label: 'Food/Groceries', min: 0, max: 50000, step: 1000 },
              { name: 'transport_fuel', label: 'Transport/Fuel', min: 0, max: 20000, step: 500 },
              { name: 'insurance_premiums', label: 'Insurance', min: 0, max: 10000, step: 100 },
              { name: 'healthcare_medical', label: 'Healthcare', min: 0, max: 10000, step: 100 },
              { name: 'lifestyle_luxuries', label: 'Lifestyle', min: 0, max: 50000, step: 1000 },
              { name: 'shopping_miscellaneous', label: 'Shopping/Misc', min: 0, max: 20000, step: 500 },
            ].map((expense) => (
              <div key={expense.name}>
                <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
                  <span>{expense.label}</span>
                  <span className="font-mono font-bold text-(--text-primary)">{formatCurrency((profile as any)[expense.name])}</span>
                </label>
                <input
                  type="range"
                  min={expense.min}
                  max={expense.max}
                  step={expense.step}
                  value={(profile as any)[expense.name]}
                  onChange={(e) => setProfile(prev => ({ ...prev, [expense.name]: Number(e.target.value) }))}
                  className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Debts Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-semibold text-(--text-primary)">Debts</h4>
            <button
              type="button"
              onClick={addDebt}
              className="flex items-center gap-1 bg-(--emerald-core) hover:bg-(--emerald-darkest) text-white px-3 py-1 rounded-lg text-xs transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Debt
            </button>
          </div>
          <div className="space-y-3">
            {profile.debts.map((debt, index) => (
              <div key={index} className="bg-(--glass-light) border border-(--glass-border) rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <input
                    type="text"
                    placeholder="Debt Name"
                    value={debt.name}
                    onChange={(e) => updateDebt(index, 'name', e.target.value)}
                    className="bg-transparent border-b border-(--glass-border) text-(--text-primary) text-sm focus:outline-none focus:border-(--emerald-core) flex-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeDebt(index)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Principal</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={debt.principal}
                      onChange={(e) => updateDebt(index, 'principal', parseFloat(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Interest %</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={debt.annual_roi}
                      onChange={(e) => updateDebt(index, 'annual_roi', parseFloat(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Monthly EMI</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={debt.monthly_emi}
                      onChange={(e) => updateDebt(index, 'monthly_emi', parseFloat(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Duration (Months)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={debt.duration_months}
                      onChange={(e) => updateDebt(index, 'duration_months', parseInt(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id={`tax-deductible-${index}`}
                    checked={debt.is_tax_deductible}
                    onChange={(e) => updateDebt(index, 'is_tax_deductible', e.target.checked)}
                    className="mr-2 accent-(--emerald-core)"
                  />
                  <label htmlFor={`tax-deductible-${index}`} className="text-xs text-(--text-secondary)">
                    Tax Deductible
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assets Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-semibold text-(--text-primary)">Assets</h4>
            <button
              type="button"
              onClick={addAsset}
              className="flex items-center gap-1 bg-(--emerald-core) hover:bg-(--emerald-darkest) text-white px-3 py-1 rounded-lg text-xs transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Asset
            </button>
          </div>
          <div className="space-y-3">
            {profile.assets.map((asset, index) => (
              <div key={index} className="bg-(--glass-light) border border-(--glass-border) rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <input
                    type="text"
                    placeholder="Asset Name"
                    value={asset.name}
                    onChange={(e) => updateAsset(index, 'name', e.target.value)}
                    className="bg-transparent border-b border-(--glass-border) text-(--text-primary) text-sm focus:outline-none focus:border-(--emerald-core) flex-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeAsset(index)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Current Value</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={asset.current_value}
                      onChange={(e) => updateAsset(index, 'current_value', parseFloat(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Expected Return %</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={asset.expected_annual_return}
                      onChange={(e) => updateAsset(index, 'expected_annual_return', parseFloat(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Monthly Contribution</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={asset.monthly_contribution}
                      onChange={(e) => updateAsset(index, 'monthly_contribution', parseFloat(e.target.value))}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                  <div>
                    <label className="text-(--text-secondary) block mb-1">Asset Type</label>
                    <input
                      type="text"
                      placeholder="Cash/Equity"
                      value={asset.asset_type}
                      onChange={(e) => updateAsset(index, 'asset_type', e.target.value)}
                      className="w-full bg-transparent border border-(--glass-border) rounded px-2 py-1 text-(--text-primary) focus:outline-none focus:border-(--emerald-core)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Monthly Extra Buffer</span>
              <span className="font-mono font-bold text-(--text-primary)">{formatCurrency(profile.monthly_extra_buffer)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={profile.monthly_extra_buffer}
              onChange={(e) => setProfile(prev => ({ ...prev, monthly_extra_buffer: Number(e.target.value) }))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Emergency Fund Goal (Months)</span>
              <span className="font-mono font-bold text-(--text-primary)">{profile.emergency_fund_goal_months} months</span>
            </label>
            <input
              type="range"
              min="3"
              max="24"
              step="1"
              value={profile.emergency_fund_goal_months}
              onChange={(e) => setProfile(prev => ({ ...prev, emergency_fund_goal_months: Number(e.target.value) }))}
              className="w-full accent-black h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-(--emerald-core) hover:bg-(--emerald-darkest) text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            {loading ? 'Analyzing...' : 'Analyze Portfolio'}
          </button>
        </div>
      </form>

      {/* Results */}
      {result && (
        <div className="mt-8 pt-6 border-t border-(--glass-border)">
          <h4 className="text-lg font-bold text-(--text-primary) mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Analysis Results
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-(--glass-dark) border border-(--glass-border) rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-red-400 font-mono">{formatCurrency(result.daily_interest_leak)}</div>
              <div className="text-xs text-(--text-secondary)">Daily Interest Leak</div>
            </div>
            <div className="bg-(--glass-dark) border border-(--glass-border) rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-blue-400 font-mono">{result.months_saved}</div>
              <div className="text-xs text-(--text-secondary)">Months Saved</div>
            </div>
            <div className="bg-(--glass-dark) border border-(--glass-border) rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-green-400 font-mono">{formatCurrency(result.interest_saved)}</div>
              <div className="text-xs text-(--text-secondary)">Interest Saved</div>
            </div>
            <div className="bg-(--glass-dark) border border-(--glass-border) rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-purple-400 font-mono flex items-center justify-center gap-1">
                <Calendar className="w-4 h-4" />
                {result.neutral_date}
              </div>
              <div className="text-xs text-(--text-secondary)">Debt-Free Date</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              result.status === 'Success' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
            }`}>
              Status: {result.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};