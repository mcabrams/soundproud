from django.shortcuts import render
from track.models import Track
from track.serializers import TrackSerializer
from rest_framework import generics


def stream(request):
    return render(request, 'stream.html')


class TrackList(generics.ListAPIView):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()
    filter_fields = ('archived',)
    ordering = ('created_at',)
