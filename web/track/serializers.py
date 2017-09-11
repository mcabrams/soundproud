from rest_framework import serializers
from . import models


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Track
        fields = (
            # Fields
            'archived',
            'artwork_url',
            'created_at',
            'gateway_id',
            'id',
            'stream_url',
            'title',
            'updated_at',
            'username',
            # Properties
            'listen_count',
        )
