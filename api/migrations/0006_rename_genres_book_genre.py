# Generated by Django 3.2.5 on 2021-08-06 17:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_genre_book_genres'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='genres',
            new_name='genre',
        ),
    ]
