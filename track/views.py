from track.models import Track
from track.serializers import TrackSerializer
from rest_framework import generics


class TrackDetail(generics.UpdateAPIView):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()
