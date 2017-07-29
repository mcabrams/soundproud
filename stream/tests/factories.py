from faker import Factory as FakerFactory
fake = FakerFactory.create()


def soundcloud_track():
    return {
            'origin': {
                'id': fake.random_int(),
                'kind': 'track',
                'title': fake.sentence(nb_words=3),
                'stream_url': fake.uri(),
                'artwork_url': fake.uri(),
                'user': {
                    'username': fake.name(),
                    },
                },
            }


def soundcloud_playlist():
    return {
            'origin': {
                'kind': 'playlist',
                'title': fake.sentence(nb_words=3),
                'user': {
                    'username': fake.name(),
                    },
                },
            }
