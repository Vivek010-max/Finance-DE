import requests
import json

payload = {
    "Income": 85000,
    "Monthly_Expenses": 45000,
    "Savings_Goal": 15000,
    "Debts": [
        {
            "name": "Credit Card",
            "principal": 80000,
            "roi": 36,
            "monthly_payment": 4000
        },
        {
            "name": "Personal Loan",
            "principal": 300000,
            "roi": 14,
            "monthly_payment": 10500
        },
        {
            "name": "Car Loan",
            "principal": 500000,
            "roi": 9.5,
            "monthly_payment": 12000
        }
    ],
    "Optimization_Mode": "Avalanche"
}

try:
    r = requests.post('http://localhost:8000/optimize-portfolio', json=payload, timeout=10)
    print(f"Status: {r.status_code}")
    print(json.dumps(r.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")