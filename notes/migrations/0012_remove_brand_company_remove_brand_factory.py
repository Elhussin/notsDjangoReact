# Generated by Django 5.1.3 on 2024-12-14 21:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0011_alter_factory_capacity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='brand',
            name='company',
        ),
        migrations.RemoveField(
            model_name='brand',
            name='factory',
        ),
    ]
