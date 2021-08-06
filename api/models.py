from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


# Create your models here.
class Author(models.Model):
    first_name = models.CharField(max_length=50, help_text='Enter a first name of the author')
    last_name = models.CharField(max_length=50, help_text='Enter a last name of the author')

    def __str__(self):
        """String for representing the Model Art object."""
        return self.last_name


class Genre(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True, help_text='Enter a genre of the book on russian')

    def __str__(self):
        """String for representing the Model Art object."""
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=100, help_text='Enter a title for the book')
    ISBN = models.CharField(max_length=30, help_text='Enter a ISBN number for the book')
    summary = models.TextField(max_length=1500, help_text='Enter a summary for the book')
    ranking = models.SmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)],
                                       help_text='Enter a ranking for the book')
    url_to_download = models.URLField(help_text='Enter an url for the source of description', null=True)
    url_to_read = models.URLField(help_text='Enter an url for the source of description', null=True)
    cover_src = models.URLField(help_text='Enter an url for the source of cover', null=True, blank=True)
    genres = models.ManyToManyField(Genre, help_text='Select or add a genre for the book')
    authors = models.ManyToManyField(Author, help_text='Select or add an Author for the book')
    users = models.ManyToManyField(User, null=True, blank=True)

    def __str__(self):
        """String for representing the Model Art object."""
        return self.title

    def display_genre_name(self):
        """Create a string for the Art. This is required to display art in Admin."""
        return ', '.join(genre.name for genre in self.genres.all()[:3])

    display_genre_name.short_description = 'Genre'

    def display_author_name(self):
        """Create a string for the Art. This is required to display art in Admin."""
        return ', '.join(author.first_name + ' ' + author.last_name for author in self.authors.all()[:3])

    display_author_name.short_description = 'Author'


User._meta.get_field('email')._unique = True