# Generated by Django 5.1.3 on 2024-12-06 10:15

import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0002_branch_phone_branch_start_date_branchmanager_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='branchmanager',
            name='assigned_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddConstraint(
            model_name='branchmanager',
            constraint=models.UniqueConstraint(fields=('user',), name='unique_user_per_branch'),
        ),
    ]