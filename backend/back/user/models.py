# models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, wallet, password=None):
        if not wallet:
            raise ValueError('Users must have a wallet address')
        user = self.model(wallet=wallet)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, wallet, password):
        user = self.create_user(wallet, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    wallet = models.CharField(max_length=50, unique=True)
    nonce = models.CharField(max_length=256, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'wallet'
    REQUIRED_FIELDS = []  # ✅ এটা অবশ্যই থাকতে হবে

    def __str__(self):
        return self.wallet

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100,blank=True)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='image', blank=True, null=True)
    email = models.EmailField(blank=True)
    

    