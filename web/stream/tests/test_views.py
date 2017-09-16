from django.test import TestCase
from django.urls import reverse


class StreamTestCase(TestCase):
    def test_uses_correct_template(self):
        res = self.client.get(reverse('stream'))
        self.assertTemplateUsed(res, 'stream.html')


class HomeTestCase(TestCase):
    def test_redirects_to_stream(self):
        res = self.client.get('/')
        self.assertRedirects(res, reverse('stream'))
