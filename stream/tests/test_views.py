from unittest.mock import patch
from django.test import TestCase
from django.urls import reverse


class StreamTestCase(TestCase):
    def setUp(self):
        self.url = reverse('stream')
        patcher = patch('stream.views.SoundcloudGateway')
        self.gateway = patcher.start().return_value
        self.addCleanup(patcher.stop)

    def test_retrieve_stream_tracks(self):
        res = self.client.get(self.url)
        self.assertTemplateUsed(res, 'stream.html')

    def test_tracks_passed_in_context(self):
        res = self.client.get(self.url)
        expected = self.gateway.get_stream_tracks()
        self.assertEqual(res.context['tracks'], expected)

    def test_call_get_stream_tracks_properly(self):
        self.client.get(self.url)
        self.gateway.get_stream_tracks.assert_called_once_with()
