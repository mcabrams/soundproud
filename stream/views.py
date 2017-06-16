from django.shortcuts import render

from .gateways.soundcloud import SoundcloudGateway


def stream(request):
    gateway = SoundcloudGateway()
    tracks = gateway.get_stream_tracks()
    return render(request, 'stream.html', {
        'tracks': tracks,
    })
