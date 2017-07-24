from unittest.mock import Mock, patch
from django.conf import settings
from django.test import TestCase

from . import factories
from stream.gateways.soundcloud import (SoundcloudAPI, SoundcloudGateway,
                                        soundcloud_client)


@patch('stream.gateways.soundcloud.soundcloud')
class SoundcloudClientTests(TestCase):
    def test_calls_soundcloud_client(self, soundcloud):
        client = soundcloud_client()
        self.assertEqual(client, soundcloud.Client.return_value)

    def test_client_instantiated_correctly(self, soundcloud):
        soundcloud_client()
        soundcloud.Client.assert_called_once_with(
            client_id=settings.SOUNDCLOUD_CLIENT_ID,
            client_secret=settings.SOUNDCLOUD_CLIENT_SECRET,
            username=settings.SOUNDCLOUD_USERNAME,
            password=settings.SOUNDCLOUD_PASSWORD,
        )


@patch('stream.gateways.soundcloud.soundcloud_client')
class SoundcloudAPIRetrieveAffiliatedTracksTests(TestCase):
    expected_path = '/me/activities/tracks/affiliated/'

    def setUp(self):
        self.api = SoundcloudAPI()

    def test_retrieve_affiliated_tracks_calls_api_correctly(self, client):
        self.api.retrieve_affiliated_tracks()
        client().get.assert_called_once_with(self.expected_path, limit=10)

    def test_retrieve_affiliated_tracks_returns_api_call(self, client):
        self.assertEqual(self.api.retrieve_affiliated_tracks(), client().get())

    def test_limit_can_be_passed_to_adjust(self, client):
        self.api.retrieve_affiliated_tracks(limit=5)
        client().get.assert_called_once_with(self.expected_path, limit=5)


class SoundcloudGatewayGetStreamTracksTests(TestCase):
    def setUp(self):
        self.collection = [factories.soundcloud_track() for _ in range(10)]
        self.gateway = SoundcloudGateway()
        response = Mock(obj={'collection': self.collection})

        patcher = patch('stream.gateways.soundcloud.SoundcloudAPI')
        self.API = patcher.start()
        self.API().retrieve_affiliated_tracks.return_value = response
        self.addCleanup(patcher.stop)

    def test_get_stream_tracks_calls_api(self):
        self.gateway.get_stream_tracks()
        self.API().retrieve_affiliated_tracks.assert_called_once_with()

    def test_get_stream_tracks_creates_proper_titles(self):
        tracks = self.gateway.get_stream_tracks()
        titles = [c['origin']['title'] for c in self.collection]
        self.assertEqual(set(t.title for t in tracks), set(titles))

    def test_get_stream_tracks_creates_stream_urls(self):
        tracks = self.gateway.get_stream_tracks()
        stream_urls = [c['origin']['stream_url'] for c in self.collection]
        self.assertEqual(set(t.stream_url for t in tracks), set(stream_urls))

    def test_get_stream_tracks_creates_username(self):
        tracks = self.gateway.get_stream_tracks()
        usernames = [c['origin']['user']['username'] for c in self.collection]
        self.assertEqual(set(t.username for t in tracks), set(usernames))

    def test_get_stream_tracks_creates_gateway_id(self):
        tracks = self.gateway.get_stream_tracks()
        ids = [c['origin']['id'] for c in self.collection]
        self.assertEqual(set(t.gateway_id for t in tracks), set(ids))

    def test_get_stream_tracks_excludes_playlists(self):
        track, playlist = (factories.soundcloud_track(),
                           factories.soundcloud_playlist())
        response = Mock(obj={'collection': [track, playlist]})
        self.API().retrieve_affiliated_tracks.return_value = response

        tracks = self.gateway.get_stream_tracks()
        self.assertEqual(len(tracks), 1)
        self.assertEqual(tracks[0].title, track['origin']['title'])
