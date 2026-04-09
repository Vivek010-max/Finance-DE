import math
import google.generativeai as genai
from datetime import date, timedelta
from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Titan Wealth & Debt Orchestrator V3")

# ✅ 1. SECURITY: Allow your HTML file to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace "*" with your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 2. AI CONFIGURATION (Gemini)
# Replace with your actual key from https://aistudio.google.com/
GEMINI_API_KEY = "AIzaSyCHXdLXzR7UGxMNqmzSoBNDDqCjanPGt78"
genai.configure(api_key=GEMINI_API_KEY)

# --- DATA MODELS ---

class DebtItem(BaseModel):
    name: str
    principal: float
    annual_roi: float
    monthly_emi: float
    duration_months: int
    is_tax_deductible: bool = False

class AssetItem(BaseModel):
    name: str
    current_value: float
    expected_annual_return: float
    monthly_contribution: float = 0.0

class FinancialProfile(BaseModel):
    monthly_income: float
    age: int = 25
    tax_bracket_percentage: float = 20.0
    rent_mortgage: float = 0
    utilities_bills: float = 0
    food_groceries: float = 0
    lifestyle_luxuries: float = 0
    shopping_miscellaneous: float = 0
    debts: List[DebtItem] = []
    assets: List[AssetItem] = []
    optimization_mode: str = "Avalanche"
    monthly_extra_buffer: float = 0.0

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

# --- MATH ENGINE ---

def run_simulation(profile: FinancialProfile, apply_strategy: bool):
    active_debts = [d.model_copy(deep=True) for d in profile.debts]
    total_assets = sum(a.current_value for a in profile.assets)
    
    # Strategy Sort
    if profile.optimization_mode == "Avalanche":
        active_debts.sort(key=lambda x: x.annual_roi, reverse=True)
    else:
        active_debts.sort(key=lambda x: x.principal)

    months = 0
    total_int = 0.0
    needs = (profile.rent_mortgage + profile.utilities_bills + profile.food_groceries)
    wants = (profile.lifestyle_luxuries + profile.shopping_miscellaneous)
    total_emi = sum(d.monthly_emi for d in profile.debts)
    
    surplus = (profile.monthly_income - needs - wants - total_emi)
    if apply_strategy:
        surplus += (wants * 0.25) + profile.monthly_extra_buffer

    while any(d.principal > 0 for d in active_debts) and months < 480:
        months += 1
        fuel = surplus
        for d in active_debts:
            if d.principal <= 0: continue
            interest = d.principal * (d.annual_roi / 100 / 12)
            total_int += interest
            d.principal += interest
            pay = min(d.principal, d.monthly_emi)
            d.principal -= pay
        
        if fuel > 0:
            for d in active_debts:
                if d.principal > 0:
                    extra = min(d.principal, fuel)
                    d.principal -= extra
                    fuel -= extra
                    if fuel <= 0: break
    
    return months, total_int

# --- API ENDPOINTS ---

@app.post("/chat")
async def chat_with_titan(request: ChatRequest):
    """Conversational AI that extracts financial data using the Gemini model."""
    system_prompt = (
        "You are the Titan Wealth Architect. Your job is to talk to the user and collect: "
        "income, expenses (rent, food, lifestyle), and a list of loans (name, balance, interest, EMI, months left). "
        "Be professional but supportive. Ask only 1-2 questions at a time. "
        "Once you have enough data, remind them they can run a 'Deep Audit'."
    )

    messages = [{"role": "system", "content": system_prompt}]
    for msg in request.history:
        messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
    messages.append({"role": "user", "content": request.message})

    response = genai.chat.create(
        model="gemini-1.5-flash",
        messages=messages,
    )

    reply = None
    if hasattr(response, 'last'):
        reply = response.last
    elif getattr(response, 'candidates', None):
        reply = response.candidates[0].content
    elif hasattr(response, 'content'):
        reply = response.content
    else:
        reply = str(response)

    return {"reply": reply}

@app.post("/api/v3/analyze-wealth-portfolio")
async def analyze_portfolio(profile: FinancialProfile):
    """The heavy math engine for debt simulation."""
    std_m, std_i = run_simulation(profile, apply_strategy=False)
    opt_m, opt_i = run_simulation(profile, apply_strategy=True)
    
    daily_leak = sum((d.principal * d.annual_roi / 100) / 365 for d in profile.debts)
    
    return {
        "daily_interest_leak": round(daily_leak, 2),
        "months_saved": std_m - opt_m,
        "interest_saved": round(std_i - opt_i, 2),
        "neutral_date": (date.today() + timedelta(days=opt_m * 30)).strftime("%B %Y"),
        "status": "Success"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)