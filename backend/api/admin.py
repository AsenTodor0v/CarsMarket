from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Car, CarImage, FavouriteCar
# Register your models here.


class CustomCarAdmin(admin.ModelAdmin):
    list_display = ('id','make', 'model', 'year', 'fuel_type', 'transmission', 'mileage', 'price', 'created_at')
    list_filter = ('make', 'model', 'year', 'fuel_type', 'transmission', 'mileage', 'price', 'created_at')
    search_fields = ('make', 'model', 'year', 'fuel_type', 'transmission', 'mileage', 'price', 'created_at')
    list_per_page = 10
    ordering = ('-created_at',)
admin.site.register(Car, CustomCarAdmin)

class CustomCarImageAdmin(admin.ModelAdmin):
    list_display = ('car', 'image')
    list_filter = ('car', 'image')
    search_fields = ('car', 'image')
    list_per_page = 10
admin.site.register(CarImage, CustomCarImageAdmin)

class CustomFavouriteCarAdmin(admin.ModelAdmin):
    list_display = ('user', 'car')
    list_filter = ('user', 'car')
    search_fields = ('user', 'car')
    list_per_page = 10
admin.site.register(FavouriteCar, CustomFavouriteCarAdmin)