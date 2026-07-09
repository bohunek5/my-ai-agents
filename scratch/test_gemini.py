import google.generativeai as genai
import os

api_key = "AIzaSyAA5NI12eolD_Cz9T2qVeVxFMNBRTg5hcM"
genai.configure(api_key=api_key)

try:
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Say hello in Polish!")
    print("Response:")
    print(response.text)
except Exception as e:
    print(f"Error calling Gemini: {e}")
