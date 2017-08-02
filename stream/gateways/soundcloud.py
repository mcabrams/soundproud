import soundcloud

from django.conf import settings

from track.models import Track


def soundcloud_client():
    return soundcloud.Client(
        client_id=settings.SOUNDCLOUD_CLIENT_ID,
        client_secret=settings.SOUNDCLOUD_CLIENT_SECRET,
        username=settings.SOUNDCLOUD_USERNAME,
        password=settings.SOUNDCLOUD_PASSWORD,
    )


class SoundcloudAPI:
    def retrieve_affiliated_tracks(self, limit=100):
        client = soundcloud_client()
        return client.get('/me/activities/tracks/affiliated/', limit=limit)


class SoundcloudGateway:
    def get_stream_tracks(self):
        api = SoundcloudAPI()
        resource = api.retrieve_affiliated_tracks()
        track_entries = _resource_to_track_entries(resource)
        existing_gateway_ids = Track.objects.values_list('gateway_id',
                                                         flat=True)
        track_entries = [t for t in track_entries
                         if t['id'] not in existing_gateway_ids]

        return [Track(**_entry_to_track_params(t)) for t in track_entries]


def _resource_to_track_entries(resource):
    collection = _collection_from_resource(resource)
    entries = _entries_from_collection(collection)
    return _filter_track_entries(entries)


def _filter_track_entries(entries):
    return [e for e in entries if _entry_is_track(e)]


def _entry_to_track_params(entry):
    return {
        'gateway_id': entry['id'],
        'title': entry['title'],
        'artwork_url': entry['artwork_url'] or '',
        'stream_url': entry['stream_url'],
        'username': entry['user']['username']
    }


def _collection_from_resource(resource):
    return resource.obj['collection']


def _entries_from_collection(collection):
    return [entry['origin'] for entry in collection]


def _entry_is_track(entry):
    return entry['kind'] == 'track'
