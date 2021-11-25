# Generated by Django 3.2.8 on 2021-11-25 11:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20211124_1648'),
    ]

    operations = [
        migrations.RenameField(
            model_name='settings',
            old_name='currency',
            new_name='current_currency',
        ),
        migrations.AddField(
            model_name='settings',
            name='prev_currency',
            field=models.CharField(choices=[('USD', '$'), ('EUR', '€'), ('RUB', '₽'), ('BYN', 'Br'), ('BTC', 'BTC')], default='USD', max_length=3),
        ),
        migrations.AlterField(
            model_name='refreshtoken',
            name='created_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 11, 25, 11, 56, 52, 115702)),
        ),
        migrations.AlterField(
            model_name='refreshtoken',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 9, 11, 56, 52, 115702)),
        ),
    ]
