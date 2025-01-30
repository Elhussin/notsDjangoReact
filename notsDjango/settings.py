
from django.utils import timezone
from pathlib import Path
import os
from datetime import timedelta
from django.core.wsgi import get_wsgi_application

BASE_DIR = Path(__file__).resolve().parent.parent



# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-*wwb$%_&f)issslt1+19j2z+)8e%^c006s3m^-h+h4$w&r^j79'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False


ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'simple_history',
    'corsheaders',
    'notes',
    'waseel',
    'accounting',
    'crm',
    'hrm',
    'reporting',
    'product' ,
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware', #تحسين الأمان ومنع الهجمات
    'django.contrib.sessions.middleware.SessionMiddleware', #إدارة جلسات المستخدمين
    'django.middleware.csrf.CsrfViewMiddleware', #منع الهجمات CSRF
    'django.contrib.auth.middleware.AuthenticationMiddleware', #إدارة عمليات المصادقة
    'django.contrib.messages.middleware.MessageMiddleware', #إدارة الرسائل
    'django.middleware.clickjacking.XFrameOptionsMiddleware', #منع الهجمات الإطارية حماية من Clickjacking
    'corsheaders.middleware.CorsMiddleware', # السماح بالطلبات من النطاقات الخارجية (CORS)
    'whitenoise.middleware.WhiteNoiseMiddleware', #إدارة الملفات الثابتة بدون سيرفر إضافي
    'django.middleware.common.CommonMiddleware',  #وظائف عامة مثل إعادة التوجيه
    'simple_history.middleware.HistoryRequestMiddleware', #تسجيل العمليات التي تمت على النظام
]

ALLOWED_HOSTS = ['localhost', '127.0.0.1'] # النطاقات المسموح لها بالوصول

CORS_ALLOWED_ORIGINS = ["http://localhost:3000",  ] # النطاقات المسموح لها بالوصول

# CORS_ALLOW_ALL_ORIGINS = False # True  تفعيل السماح لجميع النطاقات
CORS_ALLOW_CREDENTIALS = True # السماح بإرسال الكوكيز
CORS_ALLOW_HEADERS = [
    "content-type", # Json - Form Data
    "authorization", # لدعم الـ JWT
    "x-csrftoken",  # لدعم CSRF Token
] # الهيدرز المسموح بها

ROOT_URLCONF = 'notsDjango.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates', #يحدد محرك القوالب المستخدم (Django Templates)
        'DIRS': [os.path.join(BASE_DIR, 'static')],  # يحدد المجلد الذي يحتوي على القوالب (مفيد عند استخدام React)
        'APP_DIRS': True, # يحدد ما إذا كان يجب البحث عن القوالب في التطبيقات
        'OPTIONS': {
            'context_processors': [ # يحدد السياقات التي يتم تمريرها إلى القوالب
                'django.template.context_processors.debug', # يحدد ما إذا كان يجب تمكين وضع التصحيح
                'django.template.context_processors.request', # يحدد ما إذا كان يجب تمكين الطلبات
                'django.contrib.auth.context_processors.auth', # يحدد ما إذا كان يجب تمكين المصادقة
                'django.contrib.messages.context_processors.messages', # يحدد ما إذا كان يجب تمكين الرسائل
            ],
        },
    },
]

WSGI_APPLICATION = 'notsDjango.wsgi.application' # تحديد ملف WSGI

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
