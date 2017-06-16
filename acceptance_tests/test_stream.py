from base import FunctionalTestCase


class TriggerTestCase(FunctionalTestCase):
    def test_shows_latest_ten_tracks_in_stream(self):
        self.driver.get(self.url('/stream/'))
        tracks = self.driver.find_elements_by_class_name('soundcloud-track')
        self.assertGreater(len(tracks), 0)
        tracks[0].find_element_by_link_text('Hide').click()
        hidden_track_classes = tracks[0].get_attribute('class')
        self.assertIn('hidden', hidden_track_classes)
