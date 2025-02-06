from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet, DepartmentViewSet, LeaveViewSet,
    AttendanceViewSet, PayrollViewSet, PerformanceReviewViewSet,
    TaskViewSet, NotificationViewSet
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'leaves', LeaveViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'payroll', PayrollViewSet)
router.register(r'performance-reviews', PerformanceReviewViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]