from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

from .choises import CarsModel, CarsFuel, CarsTransmission
# Create your models here.

class Car(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    make = models.CharField(max_length=60, choices=CarsModel.choices)
    model = models.CharField(max_length=60)
    year = models.PositiveIntegerField()
    fuel_type = models.CharField(max_length=60, choices=CarsFuel.choices)
    transmission = models.CharField(max_length=60, choices=CarsTransmission.choices)
    mileage = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=120)
    slug =models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:  # Generate slug only if it doesn't exist
            base_slug = slugify(f"{self.make}-{self.model}-{self.year}")
            slug = base_slug
            counter = 1
            while Car.objects.filter(slug=slug).exists():  # Ensure uniqueness
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.make} {self.model} {self.year} - {self.price}' 
    
class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='cars_images/')

    def __str__(self) -> str:
        return f'Image for {self.car.make} {self.car.model}'
    
class FavouriteCar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favourites')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='favourited_by')

    class Meta:
        unique_together = ('user', 'car')

    def __str__(self) -> str:
        return f'{self.user.username} saved {self.car.make} {self.car.model}'