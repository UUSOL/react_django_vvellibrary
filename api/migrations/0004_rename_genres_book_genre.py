# Generated by Django 3.2.5 on 2021-08-06 17:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_genre_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='genres',
            new_name='genre',
        ),
    ]
