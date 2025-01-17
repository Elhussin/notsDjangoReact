from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests
from datetime import datetime, timedelta, timezone

# تعريف المتغيرات العامة
access_token = None
refresh_token = None
token_expiry = None
token_url = 'https://api.eclaims.waseel.com/oauth/authenticate'

def index(request):
    return HttpResponse("مرحبًا بك في تطبيق Blog!")

def save_tokens(response):
    global access_token, refresh_token, token_expiry
    access_token = response['access_token']
    refresh_token = response['refresh_token']
    expires_in = response['expires_in']
    # token_expiry = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
    token_expiry = datetime.strptime(expires_in, "%Y-%m-%dT%H:%M:%S.%f%z")
    with open("tokens.json", "w") as file:
        json.dump({
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_expiry": token_expiry.isoformat()
        }, file)
    print("Token saved successfully.")

def load_tokens(username, password):
    """
    تحميل التوكن من الملف أو إنشاء توكن جديد باستخدام اسم المستخدم وكلمة المرور.
    
    :param username: اسم المستخدم للحصول على التوكن.
    :param password: كلمة المرور للحصول على التوكن.
    """
    global access_token, refresh_token, token_expiry
    try:
        with open("tokens.json", "r") as file:
            content = file.read().strip()
            if not content:
                print("File is empty. Requesting new tokens...")
                getToken(username, password) 
                return
            tokens = json.loads(content)
            access_token = tokens.get('access_token')
            refresh_token = tokens.get('refresh_token')
            token_expiry = datetime.fromisoformat(tokens.get('token_expiry'))
        if is_token_valid():
            print("Token loaded successfully.")
        else:
            print("Token is expired. Refreshing...")
            refresh_access_token(username, password)
    except FileNotFoundError:
        print("No token found. Requesting new tokens...")
        getToken(username, password) 
    except json.JSONDecodeError:
        print("Invalid JSON in tokens file. Requesting new tokens...")
        getToken(username, password)  

def is_token_valid():
    if not access_token or not token_expiry:
        return False
    return datetime.now(timezone.utc) < token_expiry

def refresh_access_token(username, password):
    global access_token, refresh_token, token_expiry
    body = {
        "refresh_token": refresh_token,
        "username": username,
        "password": password
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(token_url, headers=headers, json=body)
    if response.status_code == 200:
        save_tokens(response.json())
    else:
        print("Error updating token:", response.status_code)

def get_access_token(username, password):
    if not is_token_valid():
        refresh_access_token(username, password)
    return access_token



def getToken(username, password):
    """
    الحصول على توكن جديد باستخدام اسم المستخدم وكلمة المرور.
    
    :param username: اسم المستخدم.
    :param password: كلمة المرور.
    """
    global token_url
    body = {
        "username": username,
        "password": password
    }
    response = requests.post(token_url, json=body)
    if response.status_code == 200:
        save_tokens(response.json())
        print("Token obtained successfully.")
    else:
        print("Error obtaining token:", response.status_code)
        
        

@csrf_exempt
def get_beneficiary_data(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            provider = body.get("provider")
            patientKey = body.get("patientKey")
            systemType = body.get("systemType")
            username = body.get("username")
            password = body.get("password")
            token = get_access_token(username, password)
            url = f"https://api.eclaims.waseel.com/beneficiaries/providers/{provider}/patientKey/{patientKey}/systemType/{systemType}"
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                return JsonResponse(response.json(), safe=False)
            else:
                return JsonResponse({"error": "Failed to fetch data", "status_code": response.status_code}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

def send_eligibility_request(provider_id, data, auth_token):
    url = f"https://api.qa-eclaims.waseel.com/eligibilities/providers/{provider_id}/request"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {auth_token}"
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            print("Request successful!")
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            return response.json()
    except Exception as e:
        print("An error occurred:", str(e))
        return None