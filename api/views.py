from django.shortcuts import render, HttpResponse
from .models import Book, Author, Genre
from django.contrib.auth.models import User

from .serializers import BookSerializer, GenreSerializer, AuthorSerializer, UserSerializer
from django.http import JsonResponse, HttpResponseNotFound
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from rest_framework.decorators import APIView


from rest_framework import generics
from rest_framework import mixins


from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# for making requests work on heroku
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os


# for test purposes
from django.core.serializers import json


# Add this CBV
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


def book_list(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser.parse(request)
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)

    except Book.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return JsonResponse(serializer.data)

    if request.method == 'PUT':
        data = JSONParser.parse(request)
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    if request.method == 'DELETE':
        book.delete()
        return HttpResponse(status=204)





@api_view(['GET', 'POST'])
def book_list_api(request):
    if request.method == 'GET':
       # books2 = Book.objects.values('title', 'authors__first_name', 'authors__last_name', 'genres__name').filter(ISBN=54)
        books = Book.objects.all()
       # import json
       # return JsonResponse(json.dumps(list(books2)), safe=False)


       # from django.core import serializers
       # data2 = serializers.serialize('json', books2)


        best_books = books.filter(genres__name='классика').order_by('-ranking')[:10].union(
            books.filter(genres__name='романы').order_by('-ranking')[:10],
            books.filter(genres__name='детективы').order_by('-ranking')[:10],
            books.filter(genres__name='сказки').order_by('-ranking')[:10], all=True)

        serializer = BookSerializer(best_books, many=True)

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET', 'PUT', 'DELETE'])
def book_detail_api(request, pk):
    try:
        book = Book.objects.get(pk=pk)

    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookList(APIView):
    def get(self, request):
        books = Book.objects.all().prefetch_related('genres', 'authors')
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookDetail(APIView):
    def get_object(self, id):
        try:
            return Book.objects.get(id=id)

        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        book = self.get_object(id)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def put(self, request, id):
        book = self.get_object(id)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        book = self.get_object(id)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookListMixin(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class BookDetailMixin(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'

    def get(self, request, id):
        return self.retrieve(request, id=id)

    def put(self, request, id):
        return self.update(request, id=id)

    def put(self, request, id):
        return self.destroy(request, id=id)


class BookViewSet(viewsets.ViewSet):

    def list(self, request):
        print('**************************************')
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        print(books)
        print(serializer)
        return Response(serializer.data)

    def create(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Book.objects.all()
        book = get_object_or_404(queryset, pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def update(self, request, pk=None):
        book = Book.objects.get(pk=pk)

        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookViewSetGeneric(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):

    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookViewSetModel(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer






class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


@api_view(['GET', 'POST'])
def books_by_genre_list_api(request, genre):
    if request.method == 'GET':
        if genre == 100:
            books = Book.objects.all()
            serializer = BookSerializer(books, many=True)
        else:
            books = Book.objects.filter(genres__id=genre)
            serializer = BookSerializer(books, many=True)

        return Response(serializer.data)


@api_view(['GET', 'POST'])
def genre_list_api(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)




import json
from django.db.models import Q

@api_view(['GET', 'POST'])
def search_api(request):
    data = json.loads(request.body)
    if request.method == 'POST':
        if data['column'] == 'all':
            books = Book.objects.filter(Q(title__contains=data['query']) | Q(authors__last_name__contains=data['query']))
        elif data['column'] == 'books':
            books = Book.objects.filter(title__contains=data['query'])
        elif data['column'] == 'authors':
            books = Book.objects.filter(authors__last_name__contains=data['query'])

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def users_books_api(request):
    if request.method == 'GET':
        print(request)
