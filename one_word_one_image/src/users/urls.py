from rest_framework import routers
from .api import UserView 

router = routers.DefaultRouter()
router.register('api/users',UserView,'users')

urlpatterns = router.urls