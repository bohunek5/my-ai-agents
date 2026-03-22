from google import genai

API_KEY = "AIzaSyAA5NI12eolD_Cz9T2qVeVxFMNBRTg5hcM"

def list_models():
    client = genai.Client(api_key=API_KEY)
    try:
        for model in client.models.list():
            print(f"Model: {model.name}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_models()
