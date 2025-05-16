from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .utils import verify_signature
import random
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

class NonceView(APIView):
    def post(self, request):
        address = request.data.get('address')
        if not address:
            return Response({'error': 'Address is required'}, status=status.HTTP_400_BAD_REQUEST)

        nonce = f"Login to NFTMart: {random.randint(100000,999999)}"
        user,_ = User.objects.get_or_create(address=address)
        user.nonse = nonce
        user.save()
        return Response({'nonce': nonce}, status=status.HTTP_200_OK)
    
class VerifySignatureView(APIView):
    def post(self, request):
        address = request.data.get('address')
        signature = request.data.get('signature')
        
        try :
            user = User.objects.get(address=address)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        is_valid_signature = verify_signature(address, signature, user.nonse)
        
        if is_valid_signature:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid signature"}, status=400)