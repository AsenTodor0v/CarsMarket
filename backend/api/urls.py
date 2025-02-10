from django.urls import path
from .views import  CarListView,CarCreateView, CarDetailUpdateDeleteView, FavoriteCarView, CarImageView
urlpatterns = [
    path('cars/', CarListView.as_view(), name='car_list'),
    path('cars/create/', CarCreateView.as_view(), name='car_create'),
    path('cars/<int:pk>/', CarDetailUpdateDeleteView.as_view(), name='car_update'),
    path('cars/favorite/<int:car_id>/', FavoriteCarView.as_view(), name='car-favorite'),
    path('cars/image/<int:car_id>/', CarImageView.as_view(), name='car-image'),
]
