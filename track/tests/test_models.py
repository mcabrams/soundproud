from django.test import TestCase

from listen.tests.factories import ListenFactory
from . import factories


class TrackTestCase(TestCase):
    def _assert_track_listen_count_matches_expected(self, count):
        track = factories.TrackFactory()
        for _ in range(count):
            ListenFactory(track=track)

        self.assertEqual(track.listen_count, count)

    def test_listen_count(self):
        for listen_count in [0, 1, 2]:
            with self.subTest(listen_count=listen_count):
                self._assert_track_listen_count_matches_expected(listen_count)
