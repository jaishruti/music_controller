from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from .serializers import RoomSerializers
from .serializers import CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response



class RoomView(generics.CreateAPIView):     #allows to create and view rooms
    queryset = Room.objects.all()
    serializer_class = RoomSerializers

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Room
from .serializers import RoomSerializers

class GetRoom(APIView):
    serializer_class = RoomSerializers
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if not code:
            return Response({"error": "Bad request: code not found in request"}, status=status.HTTP_400_BAD_REQUEST)

        room = get_object_or_404(Room, code=code)
        data = RoomSerializers(room).data
        print(data)
        data['is_host'] = request.session.session_key == room.host

        return Response(data, status=status.HTTP_200_OK)

class CreateRoomView(APIView):  #APIView overrides the methods 
    serializer_class = CreateRoomSerializer
    def post(self,request,format=None):
        #check if session is not established
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()   #create a neww session
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():   #check whether the data recieved is valid or not
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host = self.request.session.session_key
            #if room already created, then just update the guest and votes
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
                return Response(RoomSerializers(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
            #srialixe the room object and pass the data as response
                return Response(RoomSerializers(room).data, status=status.HTTP_201_CREATED)       
#how do we identify host? using session, identifies by unique key,
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
