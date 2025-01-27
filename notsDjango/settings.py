"""
Django settings for notsDjango project.

Generated by 'django-admin startproject' using Django 5.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
from django.utils import timezone
from pathlib import Path
import os
from datetime import timedelta
from django.core.wsgi import get_wsgi_application
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-*wwb$%_&f)issslt1+19j2z+)8e%^c006s3m^-h+h4$w&r^j79'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = ['*']
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# daphne -b 0.0.0.0 -p 8000 notsDjango.asgi:application

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'notes',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'waseel',
    'accounting',
    'crm',
    'hrm',
    'reporting',

]



CORS_ALLOW_ALL_ORIGINS = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',




]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # عنوان تطبيق React
    " http://127.0.0.1:8000"
]
# CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
]

# Access-Control-Allow-Origin: http://127.0.0.1:8000

ROOT_URLCONF = 'notsDjango.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'static')],  # مسار مجلد build

        # 'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'notsDjango.wsgi.application'
# تأكد من أن المسار صحيح هنا
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notsDjango.settings')

# application = get_wsgi_application()
# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'
current_tz = timezone.get_current_timezone()
TIME_ZONE = current_tz

USE_I18N = True

USE_TZ = True


STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



SIMPLE_JWT = {
    # 'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    # 'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # 'ROTATE_REFRESH_TOKENS': True,
    # 'BLACKLIST_AFTER_ROTATION': True,
     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),  # مدة صلاحية الـ access token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # مدة صلاحية الـ refresh token
    'ROTATE_REFRESH_TOKENS': False,  # إذا كنت ترغب في تدوير التوكنات (إصدار refresh token جديد بعد كل استخدام)
    'BLACKLIST_AFTER_ROTATION': False,  # إذا كنت ترغب في إلغاء التوكنات بعد التدوير
    'UPDATE_LAST_LOGIN': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_COOKIE': 'access_token',  # اسم الكوكي الخاص بـ Access Token
    'AUTH_COOKIE_SECURE': False,   # يفضل True في حالة استخدام HTTPS
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_PATH': '/',
    'AUTH_COOKIE_SAMESITE': 'Lax',
    'REFRESH_COOKIE': 'refresh_token',  # اسم الكوكي الخاص بـ Refresh Token
    'REFRESH_COOKIE_SECURE': False,
    'REFRESH_COOKIE_HTTP_ONLY': True,
    'REFRESH_COOKIE_PATH': '/',
    'REFRESH_COOKIE_SAMESITE': 'Lax',
}


# Ensure the cookies are secure
SESSION_COOKIE_SECURE = False # True  # Requires HTTPS for cookies
CSRF_COOKIE_SECURE = False #True     # CSRF cookie secure
SESSION_COOKIE_HTTPONLY =False # True  # Prevent JavaScript access to cookies
CSRF_COOKIE_HTTPONLY = True

# Optional but recommended for modern setups
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
