from django.conf.urls import url
from django.views.generic.base import RedirectView

from . import views

urlpatterns = [
    url(r'^$',
        RedirectView.as_view(url='stream/', permanent=False),
        name='stream'),
    url(r'^stream/', views.stream, name='stream'),
    url(r'^tracks/$', views.TrackList.as_view()),
]
