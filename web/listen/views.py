from .models import Listen
from .serializers import ListenSerializer
from rest_framework import generics


class ListenCreate(generics.CreateAPIView):
    serializer_class = ListenSerializer
    queryset = Listen.objects.all()
