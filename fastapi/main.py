import math
from datetime import date, timedelta
from typing import List, Optional, Dict
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="Titan Wealth & Debt Orchestrator",
    description="Advanced Multi-Portfolio Simulation, Tax-Aware Analytics, and Neutral Phase Prediction.",
    version="3.0.0"
)

# ---------------------------------------------------------
# 1. CORE DATA SCHEMAS (Vast Inputs)
# ---------------------------------------------------------

class DebtItem(BaseModel):
    name: str = Field(..., example="HDFC Home Loan")
    principal: float = Field(..., gt=0)
    annual_roi: float = Field(..., ge=0, le=100)
    monthly_emi: float = Field(..., gt=0)
    duration_months: int = Field(..., gt=0)  # Fixed field name for validation
    is_tax_deductible: bool = False  
    loan_type: str = "Unsecured" # Secured, Unsecured, Mortgage

class AssetItem(BaseModel):
    name: str = Field(..., example="Nifty 50 Index Fund")
    current_value: float = Field(..., ge=0)
    expected_annual_return: float = Field(..., ge=0)
    monthly_contribution: float = 0.0
    asset_type: str = "Equity" # Equity, Debt, Gold, Cash

class FinancialProfile(BaseModel):
    # Income & Demographics
    monthly_income: float = Field(..., gt=0)
    age: int = Field(..., ge=18, le=100)
    tax_bracket_percentage: float = Field(20.0, ge=0, le=50)
    
    # Detailed Monthly Expenses
    rent_mortgage: float = 0
    utilities_bills: float = 0
    food_groceries: float = 0
    transport_fuel: float = 0
    insurance_premiums: float = 0
    healthcare_medical: float = 0
    education_fees: float = 0
    lifestyle_luxuries: float = 0
    shopping_miscellaneous: float = 0
    
    # Portfolio Collections
    debts: List[DebtItem] = []
    assets: List[AssetItem] = []
    
    # Simulation Parameters
    optimization_mode: str = "Avalanche" # "Avalanche" or "Snowball"
    monthly_extra_buffer: float = 0.0
    emergency_fund_goal_months: int = 6

# ---------------------------------------------------------
# 2. THE WEALTH INTELLIGENCE ENGINE (The Logic)
# ---------------------------------------------------------

class WealthEngine:
    def __init__(self, profile: FinancialProfile):
        self.profile = profile
        self.needs = (
            profile.rent_mortgage + profile.utilities_bills + profile.food_groceries +
            profile.transport_fuel + profile.insurance_premiums + profile.healthcare_medical +
            profile.education_fees
        )
        self.wants = profile.lifestyle_luxuries + profile.shopping_miscellaneous
        self.total_emis = sum(d.monthly_emi for d in profile.debts)
        self.total_outflow = self.needs + self.wants + self.total_emis
        self.initial_net_worth = sum(a.current_value for a in profile.assets) - sum(d.principal for d in profile.debts)

    def get_daily_interest_drain(self) -> float:
        """Calculates exact monetary leak per 24 hours across all debts."""
        daily_loss = sum((d.principal * (d.annual_roi / 100)) / 365 for d in self.profile.debts)
        return round(daily_loss, 2)

    def run_simulation(self, apply_strategy: bool = True):
        """Simulates month-by-month wealth progression until all debt is cleared."""
        # Deep copies to avoid modifying original data
        active_debts = [d.model_copy(deep=True) for d in self.profile.debts]
        total_assets_value = sum(a.current_value for a in self.profile.assets)
        
        # Strategy Sort: Avalanche (High ROI first) vs Snowball (Low Balance first)
        if self.profile.optimization_mode == "Avalanche":
            active_debts.sort(key=lambda x: x.annual_roi, reverse=True)
        else:
            active_debts.sort(key=lambda x: x.principal)

        months_passed = 0
        total_interest_accrued = 0.0
        history = []
        
        # Logic: If strategy is ON, we cut 'Wants' by 25% to fuel the debt-killer surplus
        strategy_bonus = (self.wants * 0.25) if apply_strategy else 0.0
        available_surplus = (self.profile.monthly_income - self.total_outflow) + strategy_bonus + self.profile.monthly_extra_buffer

        while any(d.principal > 0 for d in active_debts) and months_passed < 480: # Cap at 40 years
            months_passed += 1
            monthly_fuel = available_surplus
            
            # A. Charge Interest and apply EMIs
            for d in active_debts:
                if d.principal <= 0: continue
                
                m_interest = d.principal * (d.annual_roi / 100 / 12)
                total_interest_accrued += m_interest
                d.principal += m_interest
                
                emi_payment = min(d.principal, d.monthly_emi)
                d.principal -= emi_payment
            
            # B. Apply Strategic Surplus (The Accelerator)
            if monthly_fuel > 0:
                for d in active_debts:
                    if d.principal > 0:
                        extra = min(d.principal, monthly_fuel)
                        d.principal -= extra
                        monthly_fuel -= extra
                        if monthly_fuel <= 0: break
            
            # C. Asset Growth & Monthly Contributions
            for a in self.profile.assets:
                # Compound existing assets
                total_assets_value *= (1 + (a.expected_annual_return / 100 / 12))
                # Add SIPs
                total_assets_value += a.monthly_contribution
            
            # If all debt is dead, redirect EMIs and Surplus to Assets
            if all(d.principal <= 0 for d in active_debts):
                total_assets_value += (self.total_emis + available_surplus)

            # Record Timeline Point
            if months_passed % 3 == 0 or months_passed == 1:
                history.append({
                    "month": months_passed,
                    "debt_remaining": round(sum(max(0, d.principal) for d in active_debts), 2),
                    "asset_growth": round(total_assets_value, 2),
                    "net_worth": round(total_assets_value - sum(max(0, d.principal) for d in active_debts), 2)
                })

        return months_passed, total_interest_accrued, total_assets_value, history

# ---------------------------------------------------------
# 3. ADVANCED ANALYTICS ENDPOINTS
# ---------------------------------------------------------

@app.post("/api/v3/analyze-wealth-portfolio")
async def analyze_portfolio(profile: FinancialProfile):
    engine = WealthEngine(profile)
    
    # Run Scenarios
    std_months, std_int, std_assets, _ = engine.run_simulation(apply_strategy=False)
    opt_months, opt_int, opt_assets, timeline = engine.run_simulation(apply_strategy=True)
    
    # Reasoning Logic
    interest_saved = std_int - opt_int
    time_saved = std_months - opt_months
    daily_drain = engine.get_daily_interest_drain()
    
    # Identify Toxic Debt (ROI > Asset Return)
    toxic_debts = [d.name for d in profile.debts if d.annual_roi > 15]
    
    return {
        "dashboard_metrics": {
            "initial_net_worth": round(engine.initial_net_worth, 2),
            "daily_interest_leak": daily_drain,
            "monthly_surplus_available": round(profile.monthly_income - engine.total_outflow, 2),
            "burn_rate_percentage": round((engine.total_outflow / profile.monthly_income) * 100, 2)
        },
        "optimization_impact": {
            "months_to_neutral_phase": opt_months,
            "interest_money_saved": round(interest_saved, 2),
            "time_saved_months": time_saved,
            "projected_neutral_date": (date.today() + timedelta(days=opt_months * 30.44)).strftime("%B %Y")
        },
        "strategic_reasoning": {
            "primary_observation": f"You are currently paying ₹{daily_drain} in interest every single day.",
            "toxic_debt_alert": f"Detected {len(toxic_debts)} high-interest accounts: {', '.join(toxic_debts)}." if toxic_debts else "No toxic debt detected.",
            "action_plan": [
                f"Cut ₹{round(engine.wants * 0.25, 2)} from lifestyle spending (25% reduction).",
                f"Inject total surplus of ₹{round((engine.wants * 0.25) + profile.monthly_extra_buffer, 2)} into {profile.debts[0].name}.",
                "Once Credit Card debt hits zero, redirect that EMI to your Equity Assets immediately."
            ]
        },
        "visual_history": timeline
    }

@app.get("/health")
def health():
    return {"status": "Titan Engine V3 Online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)