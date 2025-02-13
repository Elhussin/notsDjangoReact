import requests

url = "http://127.0.0.1:8000/api/users/auth/logins/"
data = {"username": "me", "password": "1"}

# print(response.json()) # {'non_field_errors': ['Unable to log in with provided credentials.']}

try:
    response = requests.post(url, json=data)
    print(response.json())
    response.raise_for_status()

except requests.exceptions.HTTPError as err:
    print(err)
