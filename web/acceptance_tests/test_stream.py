from decimal import Decimal
from enum import Enum, auto
from .base import FunctionalTestCase
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
import random
import time


class ArchiveTrackEntry(Enum):
    STREAM_TRACK = auto()
    PLAYER = auto()


class StreamTestCase(FunctionalTestCase):
    fixtures = ('track',)

    def setUp(self):
        self.driver.get(self.url('/stream/'))
        self.page = StreamPage(self.driver)

    def test_playing_tracks(self):
        self.assertGreater(len(self.page.tracks), 0)

        first_track = self.page.tracks[0]
        self.assertEqual(first_track.listen_count.text, '0 plays')
        first_track.play_or_pause_button.click()
        first_audio_source = self.page.audio.source
        self.assertEqual(first_track.listen_count.text, '1 play')

        next_track = self.page.tracks[1]
        next_track.play_or_pause_button.click()
        second_audio_source = self.page.audio.source
        self.assertNotEqual(first_audio_source, second_audio_source)

        self.page.player.play_next_button.click()
        third_audio_source = self.page.audio.source
        self.assertNotEqual(second_audio_source, third_audio_source)

    def test_pausing_tracks(self):
        track = random.choice(self.page.tracks)

        self.assertFalse(self.page.audio_is_playing)

        track.play_or_pause_button.click()

        self.assertTrue(self.page.audio.source_is_prefixed_properly)
        self.assertTrue(self.page.audio_is_playing)

        track.play_or_pause_button.click()

        self.assertFalse(self.page.audio_is_playing)

    def test_track_progress(self):
        track = random.choice(self.page.tracks)
        track.play_or_pause_button.click()
        self.assertEqual(self.page.audio.current_time, 0)

        self.assertEqual(self.page.audio_progress.percentage_complete, 0)

        time.sleep(1)

        total_time = self.page.audio.total_time
        self.assertTrue(1 < self.page.audio.current_time < 2,
                        msg='Expected current time between 1 and 3; was '
                            '{}'.format(self.page.audio.current_time))

        self.assertTrue(self.page.audio_progress.percentage_complete > 0)

        # Smoke test to check that progress is filling up
        expected_percent = 100 * (self.page.audio.current_time / total_time)
        self._assert_within_percentage_delta(
            self.page.audio_progress.percentage_complete,
            expected_percent, percentage=50)

    def _assert_within_percentage_delta(self, first, second, percentage=5):
        msg = ''
        ratio = Decimal(percentage / 100)
        high_end = first + first * ratio
        low_end = first - first * ratio

        is_expected_result = low_end < second < high_end

        if not is_expected_result:
            actual_ratio = second / first
            actual_delta = abs(actual_ratio - 1)
            actual_percentage_delta = actual_delta * 100
            msg = ('Expected {} to be within {}% delta of {};'
                   'Actual percentage delta was {}%'.format(
                       second, percentage, first, actual_percentage_delta))

        self.assertTrue(is_expected_result, msg=msg)

    def test_seeking_track(self):
        self.skipTest('TODO')

    def test_no_tracks_present(self):
        self.skipTest('TODO')

    def test_plays_next_track_automatically(self):
        self.skipTest('TODO')

    def test_plays_next_track_after_archive_if_playing(self):
        self.skipTest('TODO')

    def test_sets_next_track_after_archive_if_paused(self):
        self.skipTest('TODO')

    def test_tracks_sorted_by_date_created_descending(self):
        self.skipTest('TODO')

    def test_archives_tracks_via_player(self):
        self._test_archives_tracks_via(ArchiveTrackEntry.PLAYER)

    def test_archives_tracks_via_stream_track(self):
        self._test_archives_tracks_via(ArchiveTrackEntry.STREAM_TRACK)

    def test_archiving_track_plays_next_track(self):
        self.skipTest('TODO')

    def test_track_is_displayed_between_refreshes(self):
        track = self.page.tracks[0]
        self.assertTrue(self.page.track_with_id_present(track.id))

        self.driver.refresh()
        self.assertTrue(self.page.track_with_id_present(track.id))

    def test_filtering_stream_shows_correct_tracks(self):
        archived_track = self.page.tracks[0]
        unarchived_track = self.page.tracks[1]
        archived_track.archive_button.click()

        self.assertTrue(self.page.track_with_id_present(unarchived_track.id))
        self.assertFalse(self.page.track_with_id_present(archived_track.id))

        self.page.archived_filter.click()
        self.assertFalse(self.page.track_with_id_present(unarchived_track.id))
        self.assertTrue(self.page.track_with_id_present(archived_track.id))

        self.page.unarchived_filter.click()
        self.assertTrue(self.page.track_with_id_present(unarchived_track.id))
        self.assertFalse(self.page.track_with_id_present(archived_track.id))

    def _test_archives_tracks_via(self, entrypoint: ArchiveTrackEntry):
        track = self.page.tracks[0]
        track.play_or_pause_button.click()

        if entrypoint is ArchiveTrackEntry.STREAM_TRACK:
            track.archive_button.click()
        elif entrypoint is ArchiveTrackEntry.PLAYER:
            self.page.player.archive_button.click()
        else:
            raise TypeError('Must use an ArchiveTrackEntry for entrypoint')

        self.assertFalse(self.page.track_with_id_present(track.id))

        self.driver.refresh()
        self.assertFalse(self.page.track_with_id_present(track.id))


class Page:
    def __init__(self, driver):
        self.driver = driver


class StreamPage(Page):
    def track_with_id_present(self, track_id):
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

    @property
    def archived_filter(self):
        return self.driver.find_element_by_link_text('Archived')

    @property
    def unarchived_filter(self):
        return self.driver.find_element_by_link_text('Unarchived')

    @property
    def audio_is_playing(self):
        if self.driver.find_elements_by_tag_name('audio'):
            return self.audio.is_playing

        return False

    @property
    def audio_progress(self):
        return AudioProgress(
            self.driver.find_element_by_class_name('audio-progress'))


class Element:
    def __init__(self, element):
        self.element = element


class Player(Element):
    @property
    def play_next_button(self):
        return self.element.find_element_by_tag_name('button')

    @property
    def archive_button(self):
        return self.element.find_element_by_css_selector(
            '.player__archive-button button')


class Audio(Element):
    URL_PREFIX = 'https://api.soundcloud.com/tracks'

    @property
    def source(self):
        return self.element.get_attribute('src')

    @property
    def source_is_prefixed_properly(self):
        return self.source.startswith(self.URL_PREFIX)

    @property
    def is_playing(self):
        is_paused = self.element.get_attribute('paused')
        return not is_paused

    @property
    def current_time(self):
        return Decimal(self.element.get_attribute('currentTime'))

    @property
    def total_time(self):
        return Decimal(self.element.get_attribute('duration'))


class AudioProgress(Element):
    @property
    def progress_el(self):
        return self.element.find_element_by_class_name(
            'audio-progress__progress')

    @property
    def has_styles(self):
        return element_has_attribute(self.progress_el, 'style')

    @property
    def percentage_complete(self):
        style = self.progress_el.get_attribute('style')

        if style:
            percent = style.replace('width: ', '').replace('%;', '')
            return Decimal(percent)

        elif self.progress_el.value_of_css_property('width') == '0px':
            return 0
        else:
            raise AssertionError('Percentage complete was neither zero width'
                                 ' nor had styles loaded.')


class element_has_attribute(object):
  """An expectation for checking that an element has a particular css class.

  returns the WebElement once it has the particular attribute
  """
  def __init__(self, element, attribute):
    self.element = element
    self.attribute = attribute

  def __call__(self, driver):
    if self.element.get_attribute(self.attribute):
        return self.element
    else:
        return False


class Track(Element):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.id = self.element.get_attribute('data-id')

    @property
    def play_or_pause_button(self):
        return self.element.find_element_by_class_name(
            'track__button--pause-play')

    @property
    def archive_button(self):
        return self.element.find_element_by_class_name(
            'track__button--archive')

    @property
    def listen_count(self):
        return self.element.find_element_by_class_name(
            'track__listen-count')
