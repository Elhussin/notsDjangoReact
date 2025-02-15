# views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework_simplejwt.tokens import RefreshToken
# from .utils import set_auth_cookies
# from django.contrib.auth import authenticate
from django.shortcuts import render
from .models import *
from .serializers import *
import logging
from notsDjango.utulities import DynamicModelViewSet
logger = logging.getLogger(__name__)

def index(request):
    return render(request, 'index.html')



class BranchViewSet(DynamicModelViewSet):
    model = Branch
    serializer_class = BranchSerializer

    def get_permissions(self):
        return super().get_default_permissions()

class BranchManagerViewSet(DynamicModelViewSet):
    model = BranchManager
    serializer_class = BranchManagerSerializer

class OrderViewSet(DynamicModelViewSet):
    model = Order
    serializer_class = OrderSerializer

class CompanyViewSet(DynamicModelViewSet):
    model = Company
    serializer_class = CompanySerializer

class FactoryViewSet(DynamicModelViewSet):
    model = Factory
    serializer_class = FactorySerializer

class BrandViewSet(DynamicModelViewSet):
    model = Brand
    serializer_class = BrandSerializer

class ProductViewSet(DynamicModelViewSet):
    model = Product
    serializer_class = ProductSerializer

class CategoryViewSet(DynamicModelViewSet):
    model = Category
    serializer_class = CategorySerializer

class TechnicalSpecificationViewSet(DynamicModelViewSet):
    model = TechnicalSpecification
    serializer_class = TechnicalSpecificationSerializer

class AdditionalDetailViewSet(DynamicModelViewSet):
    model = AdditionalDetail
    serializer_class = AdditionalDetailSerializer

class RatingViewSet(DynamicModelViewSet):
    model = Rating
    serializer_class = RatingSerializer

class ReviewViewSet(DynamicModelViewSet):
    model = Review
    serializer_class = ReviewSerializer