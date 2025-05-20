from django.contrib import admin
from django.urls import path, include
from .views import RoomView
from .views import CreateRoomView

urlpatterns = [
    path('home',RoomView.as_view()),
    path('create-room',CreateRoomView.as_view())
    # path('',main),
]