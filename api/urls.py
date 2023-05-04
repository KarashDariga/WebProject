from django.urls import path, include
from rest_framework import routers
from api.views import *


router_events = routers.SimpleRouter()
router_events.register(r'events', EventsViewSet)
router_categories = routers.SimpleRouter()
router_categories.register(r'categories', CategoryViewSet)
router_companies = routers.SimpleRouter()
router_companies.register(r'companies', CompanyViewSet)

urlpatterns = [
    path('category/<int:cat_id>/events/', EventsByCategoryList.as_view()),
    path('company/<int:company_id>/events/', EventsByCompanyList.as_view()),
    path('', include(router_events.urls)),
    path('', include(router_categories.urls)),
    path('', include(router_companies.urls)),

     # path('favorites/', FavoritesViewSet.as_view({'get': 'get'})), #
]

