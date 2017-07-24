from rest_framework import serializers
from . import models


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Track
        fields = ('gateway_id', 'title', 'stream_url', 'username')
