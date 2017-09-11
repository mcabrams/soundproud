from rest_framework import serializers
from . import models


class ListenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Listen
        fields = (
            'track',
        )
