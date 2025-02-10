from rest_framework import serializers
from .models import Car, FavouriteCar, CarImage


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'user', 'make', 'model', 'year', 'fuel_type', 'transmission', 
                  'mileage', 'price', 'description', 'location', 'slug', 'created_at']
        read_only_fields = ['slug', 'created_at'] 

class FavoriteCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteCar
        fields = ['id', 'user', 'car']
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        car = validated_data['car']

        favorite, created = FavouriteCar.objects.get_or_create(user=user, car=car)
        return favorite
    

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['id', 'car', 'image']

    def create(self, validated_data):
        car = validated_data['car']
        image = validated_data['image']
        car_image = CarImage.objects.create(car=car, image=image)
        return car_image