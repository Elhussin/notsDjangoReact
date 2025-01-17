# Generated by Django 5.1.3 on 2024-12-06 10:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0003_branchmanager_assigned_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='branch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='branch', to='notes.branch'),
        ),
    ]
