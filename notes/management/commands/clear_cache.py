from django.core.management.base import BaseCommand
from django.core.cache import cache
import os
import shutil

class Command(BaseCommand):
    help = 'مسح جميع ملفات الكاش في Django'

    def handle(self, *args, **kwargs):
        # مسح الكاش باستخدام Django cache
        cache.clear()
        
        # مسح ملفات الكاش المخزنة في `__pycache__`
        for root, dirs, files in os.walk('.'):
            for dir_name in dirs:
                if dir_name == '__pycache__' :
                    shutil.rmtree(os.path.join(root, dir_name))
        
        self.stdout.write(self.style.SUCCESS("✅ All cache files have been cleared successfully!"))
