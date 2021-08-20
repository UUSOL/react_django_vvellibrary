from django.urls import path, include

from .views import UserViewSet, BookList
from .views import book_list_api, books_by_genre_list_api, genre_list_api, search_api, users_books_api, individual_book
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
#router.register('choice/', GetAuthToken.as_view(), basename='choice')
router.register('users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('books/', book_list_api),
    path('books/<int:pk>', individual_book),
    path('books/search', BookList.as_view()),
    path('genres/<int:genre>', books_by_genre_list_api),
    path('genres/', genre_list_api),
    path('search/', search_api),
    path('choice/', users_books_api),
]
