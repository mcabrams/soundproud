from django.test import TestCase
from django.urls import reverse


class StreamTestCase(TestCase):
    def test_retrieve_stream_tracks(self):
        self.fail()
        url = reverse('stream')
        self.client.get(url)
