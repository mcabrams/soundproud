from base import FunctionalTestCase


class TriggerTestCase(FunctionalTestCase):
    def test_shows_latest_ten_tracks_in_stream(self):
        self.driver.get(self.url('/'))
        tracks = self.driver.find_elements_by_class_name('.soundcloud-track')
        self.assertEqual(len(tracks), 10)
