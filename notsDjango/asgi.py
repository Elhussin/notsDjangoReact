
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notsDjango.settings')

application = get_asgi_application()

# 📌 النتيجة: سيتم مسح الكاش كل مرة يتم فيها إعادة تشغيل السيرفر.

# uvicorn notsDjango.asgi:application --host 127.0.0.1 --port 8000 --reload
from django.core.cache import cache
cache.clear()

cache.clear()
print("✅ All cache files have been cleared successfully! ..")
