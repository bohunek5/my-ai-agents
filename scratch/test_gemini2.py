from google import genai

api_key = "AIzaSyAA5NI12eolD_Cz9T2qVeVxFMNBRTg5hcM"

try:
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents='Say hello in Polish!'
    )
    print("Response:")
    print(response.text)
except Exception as e:
    print(f"Error calling Gemini: {e}")
