from django.db import models

class CarsModel(models.TextChoices):
    BMW = 'BMW'
    AUDI = 'Audi'
    MERCEDES = 'Mercedes'
    TOYOTA = 'Toyota'
    VOLKSWAGEN = 'Volkswagen'
    LEXUS = 'Lexus'
    HONDA = 'Honda'
    HUMMER = 'Hummer'

class CarsFuel(models.TextChoices):
    GASOLINE = 'Gasoline'
    DIESEL = 'Diesel'
    ELECTRIC = 'Electric'
    HYBRID = 'Hybrid'

class CarsTransmission(models.TextChoices):
    MANUAL = 'Manual'
    AUTOMATIC = 'Automatic'