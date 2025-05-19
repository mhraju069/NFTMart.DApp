from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .utils import verify_signature
import random
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class NonceView(APIView):
    def post(self, request):
        wallet = request.data.get('wallet')
        if not wallet:
            return Response({'error': 'wallet is required'}, status=status.HTTP_400_BAD_REQUEST)

        nonce = f"Login to NFTMart: {random.randint(100000,999999)}"
        user,_ = User.objects.get_or_create(wallet=wallet.lower())
        user.nonce = nonce
        user.save()
        return Response({'nonce': nonce}, status=status.HTTP_200_OK)
    
class VerifySignatureView(APIView):
    def post(self, request):
        wallet = request.data.get('wallet')
        signature = request.data.get('signature')
        
        try :
            user = User.objects.get(wallet=wallet.lower())
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        is_valid_signature = verify_signature(wallet, signature, user.nonce)
        
        if is_valid_signature:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid signature"}, status=400)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        profile,created= Profile.objects.get_or_create(user=user)
        return Response({
            'name' : profile.name,
            'bio' : profile.bio,
            'email' : profile.email,
            'image' : profile.image.url if profile.image else "",
        })
        
class FetchProfileView(APIView):
    def get(self, request, address):
        profile = Profile.objects.get(user__wallet=address.lower())
        if profile:
            return Response({
                'name': profile.name,
                'image': profile.image.url if profile.image else None,
            })
        else:
            return Response({"error":"No Profile Found"}, status=status.HTTP_404_NOT_FOUND)
            

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request,address):

        try:
            profile = Profile.objects.get(user__wallet=address.lower())

            profile.name = request.data.get('name', profile.name)
            profile.bio = request.data.get('bio', profile.bio)
            profile.email = request.data.get('email', profile.email)

            if 'image' in request.FILES:
                profile.image = request.FILES['image']

            profile.save()
            return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)

        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
