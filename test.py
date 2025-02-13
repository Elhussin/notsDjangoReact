import requests

url = "http://127.0.0.1:8000/api/"
data = {"username": "me", "password": "1"}

# print(response.json()) # {'non_field_errors': ['Unable to log in with provided credentials.']}

try:
    response = requests.post(f'{url}users/auth/logins/', json=data)
    print("Login",response.json())
    response.raise_for_status()

except requests.exceptions.HTTPError as err:
    print(err)




data='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MDA2OTEzNSwiaWF0IjoxNzM5NDY0MzM1LCJqdGkiOiI3ZGY1YThkY2FkNzE0MjZjYTdiYTIyZTcyNmUxYTVlMCIsInVzZXJfaWQiOjF9.lOiNI0u5ZXD99u_Bln9zK7wKgh8t6S0hDmZ_LOTajGw'
try:
    response = requests.post(f'{url}users/auth/token/refresh/', json=data)
    print("Refresh",response.json())
    response.raise_for_status()

except requests.exceptions.HTTPError as err:
    print(err)
    
    
    
try:
    response = requests.post(f'{url}users/users/auth/logout/', json=data)
    print("Log Out ",response.json())
    response.raise_for_status()

except requests.exceptions.HTTPError as err:
    print(err)
    
    
    