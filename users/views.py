from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from dj_rest_auth.views import LoginView

@method_decorator(csrf_exempt, name='dispatch')
class CustomLoginView(LoginView):
    pass
