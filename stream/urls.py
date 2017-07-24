from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^stream/$', views.stream, name='stream'),
    url(r'^tracks/$', views.TrackList.as_view()),
]
