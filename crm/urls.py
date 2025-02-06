from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet, InteractionViewSet, ComplaintViewSet,
    OpportunityViewSet, TaskViewSet, CampaignViewSet, TeamViewSet, DocumentViewSet
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'interactions', InteractionViewSet)
router.register(r'complaints', ComplaintViewSet)
router.register(r'opportunities', OpportunityViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'campaigns', CampaignViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]