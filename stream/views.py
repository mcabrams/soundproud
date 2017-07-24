from django.shortcuts import render
from track.models import Track
from track.serializers import TrackSerializer
from rest_framework import mixins
from rest_framework import generics


def stream(request):
    return render(request, 'stream.html')


class TrackList(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
