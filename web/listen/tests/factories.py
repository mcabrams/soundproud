import factory
from track.tests.factories import TrackFactory
from listen import models


class ListenFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Listen

    track = factory.SubFactory(TrackFactory)
