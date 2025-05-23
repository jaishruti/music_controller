from django.contrib import admin
from django.urls import path, include
from .views import  RoomView
from .views import CreateRoomView
from .views import GetRoom
from .views import JoinRoom
from .views import UserInRoom

urlpatterns = [
    path('home',RoomView.as_view()),
    path('create-room',CreateRoomView.as_view()),
    path('get-room',GetRoom.as_view()),
    path('join-room',JoinRoom.as_view()),
    path('user-in-room',UserInRoom.as_view())

    # path('',main),
]