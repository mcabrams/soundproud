import factory
from track import models


class TrackFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Track

    gateway_id = factory.Faker('pyint')
    title = factory.Faker('sentence', nb_words=3)
    stream_url = factory.Faker('uri')
    artwork_url = factory.Faker('uri')
    username = factory.Faker('name')
    archived = False
