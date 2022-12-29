from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length = 120)
    last_name = models.CharField(max_length = 120)
    email = models.EmailField(max_length = 120, unique = True)
    username = models.CharField(max_length = 120, unique = True)
    profile_picture = models.ImageField(upload_to = "profile_pictures", blank = True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    def _str_(self):
        return self.first_name

class Clip(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)
    clip = models.FileField(upload_to = "clips")
    clip_name = models.CharField(max_length = 120)
    clip_description = models.TextField()
    clip_thumbnail = models.ImageField(upload_to = "clip_thumbnails", blank = True)
    clip_isPublic = models.BooleanField(default = False)
    clip_views = models.IntegerField(default = 0)
    clip_likes = models.IntegerField(default = 0)
    clip_image_url = models.CharField(max_length = 500, blank = True)
    clip_url_aws = models.CharField(max_length = 500, blank = True)
    clip_soundtrack_url = models.CharField(max_length = 500, blank = True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    def _str_(self):
        return self.clip_name

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    clip = models.ForeignKey(Clip, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    def _str_(self):
        return self.comment