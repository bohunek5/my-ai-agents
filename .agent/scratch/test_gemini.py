import os
import google.generativeai as genai

print("Attempting to run Gemini API...")
try:
    # Check if there is an implicit key
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content("Hello! What is your name?")
    print("Success! Response:", response.text)
except Exception as e:
    print("Error:", e)
