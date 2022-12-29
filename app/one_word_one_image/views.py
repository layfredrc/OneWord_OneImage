from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, ClipSerializer
from .models import User, Clip

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]


class ClipView(viewsets.ModelViewSet):
    serializer_class = ClipSerializer
    queryset = Clip.objects.all()
    permission_classes = [permissions.AllowAny]