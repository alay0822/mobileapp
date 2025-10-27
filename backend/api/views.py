from rest_framework import views, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string

User = get_user_model()

class GenerateOTPView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        otp = get_random_string(length=6, allowed_chars='0123456789')
        request.session['otp'] = otp

        send_mail(
            subject="Password Reset OTP",
            message=f"Your OTP for password reset is: {otp}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )

        return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)

class VerifyOTPView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        otp = request.data.get('otp')
        session_otp = request.session.get('otp')

        if otp == session_otp:
            return Response({"message": "OTP verified."}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(views.APIView):
    """
    View to change the user's password after OTP verification.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        password = request.data.get('new_password')

        if not password:
            return Response({"error": "Password is required."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()

        return Response({"message": "Password successfully changed."}, status=status.HTTP_200_OK)
