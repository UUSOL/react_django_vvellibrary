
from django.urls import path, include


# with routers and viewset
from .views import BookViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('books/', BookViewSet, basename='books')
router.register('users/', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
