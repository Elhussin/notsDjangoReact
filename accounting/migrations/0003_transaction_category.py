# Generated by Django 5.1.3 on 2025-02-05 16:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0002_category_remove_account_balance_account_currency_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='transactions', to='accounting.category'),
        ),
    ]
