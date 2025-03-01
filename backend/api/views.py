from rest_framework.generics import ListAPIView,CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User


from .models import Car, FavouriteCar, CarImage
from .serializers import CarSerializer, FavoriteCarSerializer, CarImageSerializer

class CarPagination(PageNumberPagination):
    page_size = 6  
    page_size_query_param = 'page_size'
    max_page_size = 100


class CarListView(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = CarPagination

class CarCreateView(CreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CarDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users

    def perform_update(self, serializer):
        """Allow only the owner of the car to update it."""
        car = self.get_object()
        if car.user != self.request.user:
            raise PermissionDenied("You do not have permission to update this car.")
        serializer.save()

    def perform_destroy(self, instance):
        """Allow only the owner of the car to delete it."""
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this car.")
        instance.delete()


class FavoriteCarView(CreateAPIView):
    queryset = FavouriteCar.objects.all()
    serializer_class = FavoriteCarSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users

    def perform_create(self, serializer):
        user = self.request.user
        car_id = self.request.data.get('car')
        try:
            car = Car.objects.get(id=car_id)
            serializer.save(user=user, car=car)
        except:
            raise serializers.ValidationError({"error": "Car not found."})
        

class CarImageView(CreateAPIView):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer
    #permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    

    def perform_create(self, serializer):
        car_id = self.request.data.get('car')
        try:
            car = Car.objects.get(id=car_id)
            serializer.save(car=car)
        except:
            raise serializers.ValidationError({"error": "Car not found."})
        

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)