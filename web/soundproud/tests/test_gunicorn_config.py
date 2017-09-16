from unittest.mock import patch

from django.test import TestCase

from soundproud import gunicorn_config


class WorkersCountTests(TestCase):
    @patch('soundproud.gunicorn_config.multiprocessing')
    def test_sets_workers_according_to_cpu_count(self, multiprocessing):
        scenarios = ((1, 3), (2, 5), (3, 7))
        for cpu_count, expected_workers in scenarios:
            with self.subTest(cpu_count=cpu_count):
                multiprocessing.cpu_count.return_value = cpu_count
                self.assertEqual(gunicorn_config.workers_count(),
                                 expected_workers)


class GunicornConfigTests(TestCase):
    def test_sets_workers_according_to_get_workers(self):
        self.assertEqual(gunicorn_config.workers_count(),
                         gunicorn_config.workers)
