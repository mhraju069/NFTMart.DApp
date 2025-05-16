from django.db import models

# Create your models here.
class User(models.Model):
    wallet = models.CharField(max_length=50,unique=True)
    nonse =  models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)