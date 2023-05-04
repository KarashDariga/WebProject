from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, mixins
from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import generics

from api.serializers import EventsModelSerializer, \
                            CategoryModelSerializer, \
                            CompanyModelSerializer, \
                            CategorySerializer, CompanySerializer
from api.models import *


class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
#     permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    serializer_class = EventsModelSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoryModelSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CompanyModelSerializer


class EventsByCategoryList(mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           GenericAPIView):

    def create(self, request, *args, **kwargs):
        request.data["category"] = kwargs["cat_id"]
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    serializer_class = EventsModelSerializer

    def get_queryset(self):
        return Events.objects.filter(category_id=self.kwargs["cat_id"])


class EventsByCompanyList(mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           GenericAPIView):

    def create(self, request, *args, **kwargs):
        request.data["company"] = kwargs["company_id"]
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    serializer_class = EventsModelSerializer

    def get_queryset(self):
        return Events.objects.filter(company_id=self.kwargs["company_id"])

   # class FavoritesViewSet(viewsets.ModelViewSet):
   # queryset = Events.objects.all()
   # permission_classes = [permissions.AllowAny]
   # serializer_class = CompanyModelSerializer

