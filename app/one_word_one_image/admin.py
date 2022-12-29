from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'username', 'created_at', 'updated_at')

# Register your models here.

admin.site.register(User, UserAdmin)
