from django.contrib import admin
from .models import Product, Category, Brand, ProductImage, ProductVariant, Warranty

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock_quantity', 'category', 'brand')
    search_fields = ('name', 'sku')

admin.site.register([Category, Brand, ProductImage, ProductVariant, Warranty])

