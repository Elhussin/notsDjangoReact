def set_auth_cookies(response, access_token, refresh_token):
    response.set_cookie(
        key="access_token",
        value=str(access_token),
        httponly=True,
        secure=False,  # في الإنتاج: ضعها إلى True مع HTTPS
        samesite="Lax",
    )
    response.set_cookie(
        key="refresh_token",
        value=str(refresh_token),
        httponly=True,
        secure=False,  # في الإنتاج: ضعها إلى True مع HTTPS
        samesite="Lax",
    )
    return response


import logging
from rest_framework_simplejwt.exceptions import InvalidToken
logger = logging.getLogger(__name__)

# class RefreshTokenView(APIView):
    # permission_classes = [AllowAny]

    # def post(self, request):
    #     refresh_token = request.COOKIES.get('refresh_token')
    #     if not refresh_token:
    #         return Response({"error": "Refresh token not found"}, status=401)

    #     try:
    #         new_token = RefreshToken(refresh_token)
    #         response = Response({"message": "Token refreshed"})
    #         response.set_cookie(
    #             key="access_token",
    #             value=str(new_token.access_token),
    #             httponly=True,
    #             secure=True,
    #             samesite='Lax',
    #         )
    #         return response
    #     except InvalidToken as e:
    #         logger.error(f"Invalid Token: {e}")
    #         return Response({"error": "Invalid token"}, status=401)