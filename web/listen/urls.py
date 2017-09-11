from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^listens/$', views.ListenCreate.as_view()),
]
