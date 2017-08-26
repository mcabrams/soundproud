from django.db import models

from soundproud.models import Base
from track.models import Track


class Listen(Base):
    track = models.ForeignKey(Track)
