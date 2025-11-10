from django.urls import path
from .views import *

urlpatterns = [
     path("api/receive-image/", receive_image, name="receive_image"),
     path('api/statistics/', get_statistics),
     #path("suppliers/", views.list_suppliers, name="list_suppliers"),
     #path("suppliers/add/", views.add_supplier, name="add_supplier"),
]