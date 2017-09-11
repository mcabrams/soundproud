from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^tracks/(?P<pk>[0-9]+)/$', views.TrackUpdate.as_view()),
]
