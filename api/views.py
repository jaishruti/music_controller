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

class JoinRoom(APIView):
    serializer_class = RoomSerializers
    lookup_url_kwargs = 'code'
    def post(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwargs)
        if not code:
            return Response({"error":"Bad Request: code not found in request"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            room = Room.objects.get(code=code)
        except Room.DoesNotExist:
            return Response({"error":"Bad Request: invalid code"}, status=status.HTTP_400_BAD_REQUEST)
        data = RoomSerializers(room).data
        if not request.session.session_key:
            request.session.save()

        #save the roomcode for that session inorder the know user had joined which room
        self.request.session['room_code'] = code
        return Response({"message":'Room Joined'}, status= status.HTTP_200_OK)
    
class GetRoom(APIView):
    serializer_class = RoomSerializers
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if not code:
            return Response({"error": "Bad request: code not found in request"}, status=status.HTTP_400_BAD_REQUEST)

        room = get_object_or_404(Room, code=code)
        data = RoomSerializers(room).data
        print(f"Received request with code: {code}")
        print(f"Serialized room data: {data}")  
        if not request.session.session_key:
            request.session.save()
        data['is_host'] = request.session.session_key == room.host

        #normalize the API response key
        data["votesToSkip"] = data.pop("votes_to_skip", 2)
        data["guestCanPause"] = data.pop("guest_can_pause", False)

        print(data)
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
                self.request.session['room_code'] = room.code
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
                return Response(RoomSerializers(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                self.request.session['room_code'] = room.code
                room.save()
            #srialixe the room object and pass the data as response
                return Response(RoomSerializers(room).data, status=status.HTTP_201_CREATED)       
#how do we identify host? using session, identifies by unique key,
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
