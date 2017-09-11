from django.core.management.base import BaseCommand
from stream import tasks


class Command(BaseCommand):
    help = 'Fetches and persists latest tracks in stream'

    def handle(self, *args, **options):
        tasks.persist_latest_stream_tracks()
