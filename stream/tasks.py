from stream.gateways.soundcloud import SoundcloudGateway
from track import models


def persist_latest_stream_tracks():
    gateway = SoundcloudGateway()
    tracks = gateway.get_unpersisted_stream_tracks()
    models.Track.objects.bulk_create(tracks)
