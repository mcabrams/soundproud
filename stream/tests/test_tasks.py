from unittest.mock import patch

from django.test import TestCase

from stream import tasks


class PersistLatestStreamTracksTestCase(TestCase):
    def setUp(self):
        patcher = patch('stream.tasks.SoundcloudGateway')
        self.SoundcloudGateway = patcher.start()
        self.addCleanup(patcher.stop)

    @patch('track.models.Track.objects')
    def test_persists_stream_tracks(self, TrackManager):
        tracks = self.SoundcloudGateway().get_unpersisted_stream_tracks()
        tasks.persist_latest_stream_tracks()
        TrackManager.bulk_create.assert_called_once_with(tracks)
