

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "notsDjango.settings") # تحديد ملف الإعدادات

application = get_wsgi_application()

# gunicorn notsDjango.wsgi:application
# WSGI_APPLICATION	يحدد نقطة الدخول لتشغيل التطبيق عبر WSGI
# wsgi.py	يجهز Django للعمل مع خادم WSGI

from django.core.cache import cache
# 📌 النتيجة: سيتم مسح الكاش كل مرة يتم فيها إعادة تشغيل السيرفر.

# 
cache.clear()
print("✅ All cache files have been cleared successfully!")
