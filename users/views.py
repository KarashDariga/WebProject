from django.contrib.auth import login, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


from .serializers import UserSerializer

from django.contrib.auth.models import User




#USER REGISTRATION
@api_view(['POST'])
def register(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        return Response("REGISTRATION COMPLETE", status=201)
    return Response(user_serializer.errors)


#USER PASSWORD UPDATE
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def change_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    if not user.check_password(current_password):
        return Response({'detail': 'Current password is incorrect.'})

    user.password = make_password(new_password)
    user.save()
    return Response({'detail': 'Password changed successfully.'})


#USER LOGOUT
@permission_classes((IsAuthenticated, ))
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if self.request.data.get('all'):
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
                token.blacklist()
            return Response({"LOGOUT"})
        refresh_token = self.request.data.get('refresh_token')
        token = RefreshToken(token=refresh_token)
        token.blacklist()
        return Response({"LOGOUT"})





