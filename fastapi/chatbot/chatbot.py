import requests

API_URL = "http://localhost:8000/predict_savings"

while True:
    print("\nEnter your details:")

    data = {
        "Income": float(input("Income: ")),
        "Age": float(input("Age: ")),
        "Dependents": float(input("Dependents: ")),
        "Rent": float(input("Rent: ")),
        "Loan_Repayment": float(input("Loan Repayment: ")),
        "Insurance": float(input("Insurance: ")),
        "Groceries": float(input("Groceries: ")),
        "Transport": float(input("Transport: ")),
        "Eating_Out": float(input("Eating Out: ")),
        "Entertainment": float(input("Entertainment: ")),
        "Utilities": float(input("Utilities: ")),
        "Healthcare": float(input("Healthcare: ")),
        "Education": float(input("Education: ")),
        "Miscellaneous": float(input("Miscellaneous: "))
    }

    response = requests.post(API_URL, json=data)
    result = response.json()

    print("\n🤖 Bot:")
    print(f"You should aim to save around ₹{result['recommended_savings']}")