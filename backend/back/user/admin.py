from django.contrib import admin
from .models import*
# Register your models here.
class profileadmin(admin.ModelAdmin):
    list_display=( "user","name","email")
admin.site.register(User)
admin.site.register(Profile,profileadmin)