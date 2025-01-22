from django.db import models

class Report(models.Model):
    REPORT_TYPES = [
        ('sales', 'Sales Report'),
        ('inventory', 'Inventory Report'),
        ('financial', 'Financial Report'),
    ]

    report_type = models.CharField(max_length=20, choices=REPORT_TYPES)
    generated_at = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()  # لتخزين بيانات التقرير

    def __str__(self):
        return f"{self.report_type} - {self.generated_at}"