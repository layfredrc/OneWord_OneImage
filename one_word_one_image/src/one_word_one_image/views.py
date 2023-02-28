import json
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http.response import JsonResponse
from rest_framework.views import APIView
from .serializers import UserSerializer, ClipSerializer, CommentSerializer, MyTokenObtainPairSerializer
from .models import User, Clip, Comment

from owoi_audio_to_clip.TranscriptFactory import TranscriptFactory
from owoi_audio_to_clip.ClipMakerFactory import ClipMakerFactory
from owoi_audio_to_clip.utils import (
    upload_video_to_gcs,
    download_audio_from_youtube,
)


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


class SnippetCreateClip(APIView):
    def post(self, request, format=None):
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            video_name = body['video_name'].replace(" ", "_")
            username = body['username']
            youtube_url = body['youtube_url']
            timestamp_start = body['timestamp_start']
            timestamp_end = body['timestamp_end']

            print(video_name, username, youtube_url, timestamp_start, timestamp_end)
            
            download_audio_from_youtube(youtube_url, "../tmp", username, video_name, int(timestamp_start), int(timestamp_end), "owoi_bucket")
            transcript_factory = TranscriptFactory(f"gs://owoi_bucket/{username}/audios/{video_name}.wav")
            transcript = transcript_factory.transcribe_audio_to_text()
            clip_maker_factory = ClipMakerFactory(video_name, username, transcript, "owoi_bucket", "../tmp", video_name, with_subtitles=True)
            clip_maker_factory.clip_maker()
            upload_video_to_gcs("owoi_bucket", username, video_name, "../tmp/")

            Clip.objects.create(
                user=User.objects.get(username=username), 
                clip_name=video_name.replace("_", " "), 
                clip_url_aws=f"https://storage.googleapis.com/owoi_bucket/{username}/videos/{video_name}.webm"
            ).save()

            return JsonResponse({'url': f'https://storage.googleapis.com/owoi_bucket/{username}/videos/{video_name}.webm', 'status': "status.HTTP_200_OK"})
        
        except Exception as e:
            return JsonResponse({'error': f'{e}', 'status': "status.HTTP_400_BAD_REQUEST"})
    