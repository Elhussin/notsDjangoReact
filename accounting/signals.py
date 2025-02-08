from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Transaction

@receiver([post_save, post_delete], sender=Transaction)
def update_related_account(sender, instance, **kwargs):
    instance.account.update_balance()