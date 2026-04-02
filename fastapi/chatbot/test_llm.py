from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="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"
)

response = client.chat.completions.create(
    model="nvidia/nemotron-3-super-120b-a12b",
    messages=[{"role": "user", "content": "Say hello"}]
)

print(response.choices[0].message.content)