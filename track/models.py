from django.db import models


class Track(models.Model):
    title = models.CharField(blank=False, max_length=512)
    stream_url = models.URLField(blank=False, max_length=512)
    username = models.CharField(blank=False, max_length=512)
