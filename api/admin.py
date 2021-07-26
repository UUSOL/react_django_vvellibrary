from django.contrib import admin
from .models import Book, Genre, Author


# Register your models here.
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'ISBN', 'summary', 'ranking', 'url_to_download', 'url_to_read')
    list_filter = ('title', 'ranking')
    fieldsets = (
        ('Title Info Section', {
            'fields': ('title', 'authors')
        }),
        ('Main Info Section', {
            'fields': ('ISBN', 'summary', 'ranking')
        }),
        ('URLs', {
            'fields': ('url_to_read', 'url_to_download')
        }),
        ('Users Section', {
            'fields': ('users', )
        }),
    )


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name')
    list_filter = ('last_name',)
