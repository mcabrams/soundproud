from django.shortcuts import render

from .gateways.soundcloud import SoundcloudGateway
from track.models import Track
from track.serializers import TrackSerializer
from rest_framework import mixins
from rest_framework import generics


def stream(request):
    gateway = SoundcloudGateway()
    tracks = gateway.get_stream_tracks()
    return render(request, 'stream.html', {
        'tracks': tracks,
    })


class TrackList(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
