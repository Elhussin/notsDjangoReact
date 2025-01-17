from django.contrib import admin
from .models import Branch, BranchManager, Order ,Company, Factory, Brand

from django.contrib.auth.models import User
from django.contrib import admin
from .models import Product, Category, Brand, ProductImage, Discount, Review, Color, Size, TechnicalSpecification


# تسجيل الموديل Branch في لوحة التحكم
@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'start_date', 'phone']
    search_fields = ['name', 'location']
    list_filter = ['start_date']
    repopulated_fields = {"slug": ("name", "location")}
    

# تسجيل الموديل BranchManager في لوحة التحكم
@admin.register(BranchManager)
class BranchManagerAdmin(admin.ModelAdmin):
    list_display = ['user', 'branch']
    search_fields = ['user__username', 'branch__name']

# تسجيل الموديل Order في لوحة التحكم
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'branch', 'status', 'created_at', 'updated_at']
    search_fields = ['order_number', 'branch__name']
    list_filter = ['status', 'created_at', 'updated_at']



class CompanyAdmin(admin.ModelAdmin):
    """
    Custom admin interface for the Company model.
    Provides search, filters, and custom display options.
    """

    # Fields to display in the list view
    list_display = (
        'name',               # Display the name of the company
        'contact_number',     # Display the contact number
        'email',              # Display the email address
        'company_type',       # Display the type of the company
        'created_at',         # Display the date the record was created
    )

    # Fields that can be searched using the search box
    search_fields = (
        'name',               # Enable search by company name
        'contact_number',     # Enable search by contact number
        'email',              # Enable search by email
    )

    # Filters to narrow down records in the list view
    list_filter = (
        'company_type',       # Filter by company type
        'created_at',         # Filter by creation date
    )

    # Fields to display in the detailed view and edit forms
    # fields = (
    #     'name',               # Company name
    #     'address',            # Address
    #     'contact_number',     # Contact number
    #     'email',              # Email
    #     'website',            # Website
    #     'logo',               # Logo
    #     'description',        # Description
    #     'registration_number', # Registration number
    #     'tax_number',         # Tax number
    #     'company_type',       # Type of the company
    # )

    # Add grouping for fields in the edit form
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'address', 'contact_number', 'email', 'website'),
        }),
        ('Additional Information', {
            'fields': ('logo', 'description', 'registration_number', 'tax_number', 'company_type'),
        }),
    )

    # Order of the displayed records
    ordering = ('name',)  # Sort by name alphabetically

# Register the Company model with the custom admin class
admin.site.register(Company, CompanyAdmin)

@admin.register(Factory)
class FactoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'established_date', 'is_active')
    list_filter = ('is_active', 'location')
    search_fields = ('name', 'owner_name')

        

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'description')
    ordering = ['name']



admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Discount)
admin.site.register(Review)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('category', 'colors', 'sizes')
    ordering = ('-created_at',)
    filter_horizontal = ('colors', 'sizes')  # لتمكين اختيار الألوان والقياسات في شاشة التحرير

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    
@admin.register(TechnicalSpecification)
class TechnicalSpecificationAdmin(admin.ModelAdmin):
    list_display = ('product', 'specification_name', 'specification_value')
    list_filter = ('product', 'specification_name')