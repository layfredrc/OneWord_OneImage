from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class UserAdmin(UserAdmin):
    list_display = ('first_name', 'last_name', 'email', 'username', 'created_at', 'updated_at')


admin.site.register(User, UserAdmin)