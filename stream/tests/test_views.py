from django.test import TestCase


class StreamTestCase(TestCase):
    def test_uses_correct_template(self):
        res = self.client.get(self.url)
        self.assertTemplateUsed(res, 'stream.html')
