
import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = os.getenv("SECRET_KEY",'django-insecure-*wwb$%_&f)issslt1+19j2z+)8e%^c006s3m^-h+h4$w&r^j79')
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1,192.168.0.104").split(",")

# CORS Settings allow frontend to access the API  by using django-cors-headers 
CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://192.168.0.104",).split(",")
# Remove empty strings from the list of origins 
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in CORS_ALLOWED_ORIGINS if origin.strip()]

CORS_ALLOW_CREDENTIALS = True           # Allow cookies to be sent with the requests
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
    "x-csrftoken",
    "accept",
]


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",             # Admin panel
    "django.contrib.auth",              # User authentication 
    "django.contrib.contenttypes",      #  Generic Model relations and content types 'GenericForeignKey'
    "django.contrib.sessions",          # Session framework 
    "django.contrib.sites",             # Multiple sites in one Django project
    "django.contrib.messages",          # Allow view functions to display messages
    "django.contrib.staticfiles",       # Serve static files 'collectstatic' command 
    # Third-party apps
    "django_admin_listfilter_dropdown", # Dropdown filter for Django admin good  with big data
    "rest_framework",                   # RESTful  API            
    "rest_framework_simplejwt",         # JSON Web Token authentication, create access and refresh tokens
    "rest_framework_simplejwt.token_blacklist", # Token blacklist for logout 
    "rest_framework.authtoken",         # Token-based authentication
    "allauth",                          # User authentication & registration 
    "allauth.account",                  # User registration & email verification & password reset
    "allauth.socialaccount",            # Social authentication OAuth 2.0
    "dj_rest_auth",                     # Allowing to use Django REST Framework with allauth 
    "dj_rest_auth.registration",        # REST API endpoints for Django allauth registration
    "simple_history",                   # Store model history and view history changes
    "corsheaders",                      # Allow frontend to access the API
    "djmoney",                          # MoneyField for Django models
    "drf_spectacular",                  # OpenAPI 3.0 schema generator for Django REST framework 
    "drf_spectacular_sidecar",          # OpenAPI 3.0 UI 'Swagger UI' for Django REST framework 
    # Local apps
    "notes",                            
    "waseel",
    "accounting",
    "crm",
    "hrm",
    "reporting",
    "product",
    "users", 
]


SITE_ID = 1     # allauth needs to it select the current site & Default site ID for Django sites framework  

REST_USE_JWT = True  # Use JWT for authentication with Django REST framework


#  REST_FRAMEWORK settings
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',                    # Default JSON renderer
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
   
    ],
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',               # Default permission for all views
    # ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',   # Use drf_spectacular for schema generation 

}
# REST_FRAMEWORK settings for development 
if DEBUG:
    # development only, Default browsable API(UI)
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append('rest_framework.renderers.BrowsableAPIRenderer')
    
    # development & manage, Allow session authentication
    # REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES'].append('rest_framework.authentication.SessionAuthentication')



# REST_AUTH = {
#     'USE_JWT': True,                    # Use JWT for authentication with Django REST framework
#     'JWT_AUTH_COOKIE': None,            # Disable JWT cookie
#     'JWT_AUTH_REFRESH_COOKIE': None,    # Disable JWT refresh cookie
# }

# use dj_rest_auth for registration and authentication 
# the default is 'dj_rest_auth.registration.serializers.RegisterSerializer'
#  can change it to CustomLoginSerializer
REST_AUTH_SERIALIZERS = {
    'LOGIN_SERIALIZER': 'dj_rest_auth.serializers.LoginSerializer',
}

# Set email verification method: 
# In development (DEBUG=True), no email verification is required.
# In production (DEBUG=False), email verification is optional.
ACCOUNT_EMAIL_VERIFICATION = "none" if DEBUG else 'optional'

# Enforce email requirement during registration.
ACCOUNT_EMAIL_REQUIRED = True  # Email is required for registration.

# Allow login using either email or username.
ACCOUNT_LOGIN_METHODS = {'email', 'username'}  # Login can be done using email or username.
# ACCOUNT_AUTHENTICATION_METHOD = "username_email"  # Login can be done using email or username.
# "Middleware helps add advanced features to enhance the security 
# and performance of the application,
#such as session management, protection against attacks,
#CORS support, and account management."
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",                    # Handles Cross-Origin Resource Sharing (CORS) for API requests
    "django.middleware.security.SecurityMiddleware",            # Provides security enhancements such as HTTPS redirection
    "whitenoise.middleware.WhiteNoiseMiddleware",               # Serves static files efficiently in production
    "django.contrib.sessions.middleware.SessionMiddleware",     # Manages user sessions 
    "django.middleware.common.CommonMiddleware",                # Provides common utilities like URL normalization
    # "django.middleware.csrf.CsrfViewMiddleware",              # Protects against Cross-Site Request Forgery (CSRF) attacks
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Handles user authentication
    "django.contrib.messages.middleware.MessageMiddleware",     # Enables message framework for temporary notifications
    "django.middleware.clickjacking.XFrameOptionsMiddleware",   # Prevents clickjacking attacks by setting X-Frame-Options (iframes)
    "allauth.account.middleware.AccountMiddleware",             # Manages user accounts and authentication with django-allauth
    "simple_history.middleware.HistoryRequestMiddleware",       # Tracks model changes with django-simple-history
]

# Set default main URLS  location 
ROOT_URLCONF = "notsDjango.urls"

# good when use admin UI Or Django TEMPLATES
TEMPLATES = [
    {
        # Specifies the template engine to be used (Django's built-in template engine)
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        # Defines directories where Django should look for templates
        "DIRS": [os.path.join(BASE_DIR, "static")],  # Recommended to use "templates" instead of "static"

        # Enables automatic template loading from each installed app’s "templates/" directory
        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [
                # Adds debugging context if DEBUG=True
                "django.template.context_processors.debug",
                
                # Makes the request object available in templates
                "django.template.context_processors.request",
                
                # Adds the authenticated user to the template context
                "django.contrib.auth.context_processors.auth",
                
                # Enables Django's messages framework in templates
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Reqiermant for production env : Gunicorn , uWSGI , Apache mod_wsgi.
WSGI_APPLICATION = "notsDjango.wsgi.application"
# To use asgi for WebSocket  
# ASGI_APPLICATION = "notsDjango.asgi.application"

# Database
if not DEBUG:
    DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
        }
    }
else:  
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
    

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us" # "ar-sa"
TIME_ZONE = "Asia/Riyadh"   # timezone.get_current_timezone()
USE_I18N = True     # Allows you to support translation and localization of text and dates.
USE_TZ = True       # (Coordinated Universal Time)Ensures that dates and times are stored in UTC format and converted to the local time zone when displayed.

# Static files
STATIC_URL = "/static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media files
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# JWT Settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=int(os.getenv("ACCESS_TOKEN_LIFETIME_MINUTES", 15))),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=int(os.getenv("REFRESH_TOKEN_LIFETIME_DAYS", 7))),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",)  #can add  "JWT"
}

# Email Settings
if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST =os.getenv("SMTP_HOST")
    EMAIL_PORT = os.getenv("SMTP_PORT")
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# Security settings for production HTTPS
if not DEBUG:
    SECURE_HSTS_SECONDS =  86400           # Purpose: Enables HTTP Strict Transport Security (HSTS). For one Year =31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True   # Purpose: Applies HSTS to all subdomains.
    # SECURE_HSTS_PRELOAD = True              # Purpose: Enables HSTS preloading. need register in hstspreload.org.
    # SECURE_SSL_REDIRECT = False              # Purpose: Redirects all HTTP traffic to HTTPS.
    SESSION_COOKIE_SECURE = True            # Purpose: Ensures that session cookies are only sent over HTTPS.
    CSRF_COOKIE_SECURE = True               # Purpose: Ensures that the CSRF token cookie is only transmitted over HTTPS.
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https') # Purpose: Helps Django detect that it is behind a reverse proxy (e.g., Nginx, AWS ELB).

SECURE_CONTENT_TYPE_NOSNIFF = True      # Prevents browsers from guessing the content type of files.
# SECURE_BROWSER_XSS_FILTER = True      # غير ضروري على Django 3.0+


#  CSRE Setting no neewd it with JWT
CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME = "HTTP_X_CSRFTOKEN"
SESSION_COOKIE_NAME = "sessionid" 
CSRF_COOKIE_HTTPONLY = True #False
 
# CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS", "").split(",")
# CORS Settings allow frontend to access the API  by using django-cors-headers 
CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS", "http://localhost:3000").split(",")
# Remove empty strings from the list of origins 
CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in CORS_ALLOWED_ORIGINS if origin.strip()]

# drf-spectacular settings  this optinat setting
SPECTACULAR_SETTINGS = {
    'TITLE': 'API Documentation',
    'DESCRIPTION': 'API for your project',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
    'SCHEMA_PATH_PREFIX': '/api/',
}