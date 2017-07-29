from django.db import models


class Base(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Track(Base):
    gateway_id = models.PositiveIntegerField(
        null=True, blank=False, unique=True)
    title = models.CharField(blank=False, max_length=512)
    stream_url = models.URLField(blank=False, max_length=512)
    artwork_url = models.URLField(blank=True, max_length=512)
    username = models.CharField(blank=False, max_length=512)
    archived = models.BooleanField(default=False)
