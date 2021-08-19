
from django.urls import path, include


# with routers and viewset
from .views import BookViewSet, UserViewSet, BookList, GenreViewSet, BookViewSetModel1
from .views import book_list_api, books_by_genre_list_api, genre_list_api, search_api, users_books_api, test_api2
from rest_framework.routers import DefaultRouter

"""book_detail_api,"""

router = DefaultRouter()
#router.register('books/', BookViewSet, basename='books')
#router.register('choice/', BookViewSet, basename='choice')
#router.register('choice/', BookViewSetModel1, basename='choice')
#router.register('choice/', GetAuthToken.as_view(), basename='choice')
router.register('users', UserViewSet)
#router.register('genr', GenreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('books/', book_list_api),
    #path('books/<int:pk>', book_detail_api),
    path('books/<int:pk>', test_api2),
    path('books/search', BookList.as_view()),
    path('genres/<int:genre>', books_by_genre_list_api),
    path('genres/', genre_list_api),
    path('search/', search_api),
    path('choice/', users_books_api),
]
