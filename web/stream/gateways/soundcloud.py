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
    def retrieve_affiliated_tracks(self, limit=10):
        client = soundcloud_client()
        return client.get('/me/activities/tracks/affiliated/', limit=limit)


class SoundcloudGateway:
    def get_stream_tracks(self):
        api = SoundcloudAPI()
        resource = api.retrieve_affiliated_tracks()
        track_entries = _resource_to_track_entries(resource)

        return [Track(**_entry_to_track_params(t)) for t in track_entries]

    def get_unpersisted_stream_tracks(self):
        """ Returns list of unpersisted Track instances; excludes tracks that
        are already present in database by comparing gateway_id; also filters
        down to single instance of tracks if multiples are included. """

        tracks = self.get_stream_tracks()
        tracks = _remove_duplicate_tracks(tracks)
        return _remove_already_persisted_tracks(tracks)


def _remove_duplicate_tracks(tracks):
    existing_gateway_ids = Track.objects.values_list(
        'gateway_id', flat=True)
    return [t for t in tracks if t.gateway_id not in existing_gateway_ids]


def _remove_already_persisted_tracks(tracks):
    seen_gateway_ids = set()
    filtered_tracks = []
    for track in tracks:
        if track.gateway_id not in seen_gateway_ids:
            seen_gateway_ids.add(track.gateway_id)
            filtered_tracks.append(track)

    return filtered_tracks


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
