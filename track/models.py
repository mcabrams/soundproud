from django.db import models


class Track(models.Model):
    gateway_id = models.PositiveIntegerField(
        null=True, blank=False, unique=True)
    title = models.CharField(blank=False, max_length=512)
    stream_url = models.URLField(blank=False, max_length=512)
    username = models.CharField(blank=False, max_length=512)
    archived = models.BooleanField(default=False)
