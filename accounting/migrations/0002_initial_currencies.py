# في ملف your_app/migrations/0002_initial_currencies.py
from django.db import migrations

def create_initial_currencies(apps, schema_editor):
    Currency = apps.get_model('accounting', 'Currency')
    Currency.objects.create(code='USD', name='US Dollar', exchange_rate=1.0)
    Currency.objects.create(code='EUR', name='Euro', exchange_rate=0.85)
    Currency.objects.create(code='SAR', name='Saudi Riyal', exchange_rate=3.75)

class Migration(migrations.Migration):
    dependencies = [
        ('accounting', '0001_initial'),
    ]
    
    operations = [
        migrations.RunPython(create_initial_currencies),
    ]