from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, UserView, ClipView, CommentView, SnippetCreateClip

router = routers.DefaultRouter()
router.register(r'users', UserView, 'user')
router.register(r'clips', ClipView, 'clip')
router.register(r'comments', CommentView, 'comment')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('api/clip/new/', SnippetCreateClip.as_view(), name = 'create_clip'),
]