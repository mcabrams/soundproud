from base import FunctionalTestCase
import time


class TriggerTestCase(FunctionalTestCase):
    fixtures = ('track',)

    def test_playing_tracks(self):
        self.driver.get(self.url('/stream/'))
        page = StreamPage(self.driver)

        self.assertGreater(len(page.tracks), 0)

        first_track = page.tracks[0]
        first_track.play_button.click()
        first_audio_source = page.audio.source
        self.assertTrue(page.audio.source_is_prefixed_properly)
        # TODO: Test that song plays

        next_track = page.tracks[1]
        next_track.play_button.click()
        second_audio_source = page.audio.source
        self.assertNotEqual(first_audio_source, second_audio_source)
        self.assertTrue(page.audio.source_is_prefixed_properly)

        page.player.play_next_button.click()
        third_audio_source = page.audio.source
        self.assertNotEqual(second_audio_source, third_audio_source)
        self.assertTrue(page.audio.source_is_prefixed_properly)

    def test_no_tracks_present(self):
        self.skipTest('TODO')

    def test_plays_next_track_automatically(self):
        self.skipTest('TODO')

    def test_tracks_sorted_by_date_created_descending(self):
        self.skipTest('TODO')

    def test_archives_tracks(self):
        self.driver.get(self.url('/stream/'))
        page = StreamPage(self.driver)
        track = page.tracks[0]

        track.archive_button.click()
        # TODO: Better fix here for implicit wait
        time.sleep(1)
        self.assertFalse(page.is_track_with_id_present(track.id))

        self.driver.refresh()
        self.assertFalse(page.is_track_with_id_present(track.id))

    def test_archiving_track_plays_next_track(self):
        self.skipTest('TODO')

    def test_track_is_displayed_between_refreshes(self):
        self.driver.get(self.url('/stream/'))
        page = StreamPage(self.driver)
        track = page.tracks[0]
        self.assertTrue(page.is_track_with_id_present(track.id))

        self.driver.refresh()
        self.assertTrue(page.is_track_with_id_present(track.id))


class Page:
    def __init__(self, driver):
        self.driver = driver


class StreamPage(Page):
    def is_track_with_id_present(self, track_id):
        selector = '[data-id="{}"]'.format(track_id)
        matches = self.driver.find_elements_by_css_selector(selector)
        return (len(matches) == 1)

    @property
    def tracks(self):
        return [Track(t) for t
                in self.driver.find_elements_by_class_name('track')]

    @property
    def audio(self):
        return Audio(self.driver.find_element_by_tag_name('audio'))

    @property
    def player(self):
        return Player(self.driver.find_element_by_class_name('player'))


class Element:
    def __init__(self, element):
        self.element = element


class Player(Element):
    @property
    def play_next_button(self):
        return self.element.find_element_by_tag_name('button')


class Audio(Element):
    URL_PREFIX = 'https://api.soundcloud.com/tracks'

    @property
    def source(self):
        return self.element.get_attribute('src')

    @property
    def source_is_prefixed_properly(self):
        return self.source.startswith(self.URL_PREFIX)


class Track(Element):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.id = self.element.get_attribute('data-id')

    @property
    def play_button(self):
        return self.element.find_element_by_class_name('track__button--pause-play')

    @property
    def archive_button(self):
        return self.element.find_element_by_class_name('track__button--archive')
