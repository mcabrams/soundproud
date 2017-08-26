from django.db import models

from soundproud.models import Base


class Track(Base):
    gateway_id = models.PositiveIntegerField(
        null=True, blank=False, unique=True)
    title = models.CharField(blank=False, max_length=512)
    stream_url = models.URLField(blank=False, max_length=512)
    artwork_url = models.URLField(blank=True, max_length=512)
    username = models.CharField(blank=False, max_length=512)
    archived = models.BooleanField(default=False)

    @property
    def listen_count(self):
        return self.listen_set.count()
