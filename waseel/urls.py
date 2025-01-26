from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # المسار الافتراضي
    path('api/get_beneficiary_cchi/',views.get_beneficiary_data, name='get_beneficiary_data'),

]
