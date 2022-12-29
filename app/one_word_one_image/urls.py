from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from one_word_one_image import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'clips', views.ClipView, 'clip')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
]
