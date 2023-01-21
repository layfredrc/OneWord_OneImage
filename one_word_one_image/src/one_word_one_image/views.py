from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, ClipSerializer, CommentSerializer, MyTokenObtainPairSerializer
from .models import User, Clip, Comment


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]


class ClipView(viewsets.ModelViewSet):
    serializer_class = ClipSerializer
    queryset = Clip.objects.all()
    permission_classes = [permissions.AllowAny]


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny]