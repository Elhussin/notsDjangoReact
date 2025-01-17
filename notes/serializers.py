from rest_framework import serializers
from .models import  Branch, BranchManager, Order, Company, Factory, Product, Category, Brand, ProductImage, Discount, Review, TechnicalSpecification

from django.contrib.auth.models import User

from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser', 'last_name', 'first_name', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        """
        Handle user creation. Hash the password when creating the user.
        """
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        """
        Handle user update. If password is provided, hash it.
        """
        password = validated_data.pop('password', None)  # Pop password if it exists
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:  # If password is provided, hash it
            instance.set_password(password)

        instance.save()
        return instance

    
    
class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'  # أو تحديد الحقول المحددة: ['id', 'name', 'location', 'manager']

class BranchManagerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # قراءة تفاصيل المستخدم فقط
    branch = BranchSerializer(read_only=True)  # قراءة تفاصيل الفرع فقط

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    branch_id = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.all(), source='branch', write_only=True
    )

    class Meta:
        model = BranchManager
        fields = ['id', 'user', 'branch', 'user_id', 'branch_id']
    
    def validate_user(self, value):
        if BranchManager.objects.filter(user=value).exists():
            raise serializers.ValidationError("This user is already assigned to another branch.")
        return value

        
class OrderSerializer(serializers.ModelSerializer):
    branch = BranchSerializer(read_only=True)  # قراءة تفاصيل الفرع فقط
    
    branch_id = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.all(), source='branch', write_only=True
    )  # استخدام ID الفرع عند الكتابة

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'branch', 'branch_id', 'status',
            'created_at', 'updated_at', 'details'
        ]



class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for the Company model.
    Converts model instances to JSON and validates incoming data.
    """

    class Meta:
        model = Company
        fields = [
            'id',                  # Unique identifier for the company
            'name',                # Company name
            'address',             # Company address
            'contact_number',      # Contact number
            'email',               # Email address
            'website',             # Website URL
            'logo',                # Logo file path
            'description',         # Description
            'registration_number', # Registration number
            'tax_number',          # Tax number
            'company_type',        # Type of company
            'created_at',          # Record creation date
            'updated_at',          # Record last update date
        ]

class FactorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Factory model to handle data validation and transformation.
    """
    class Meta:
        model = Factory
        fields = '__all__'  # Include all fields from the Factory model
        # You can specify specific fields instead:
        # fields = ['id', 'name', 'location', 'established_date', 'owner_name', 'capacity', 'contact_email', 'is_active']
        
    
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()  # لعرض اسم التصنيف بدلًا من الـ ID
    brand = serializers.StringRelatedField()     # لعرض اسم العلامة التجارية بدلًا من الـ ID
    images = serializers.SerializerMethodField()  # لجلب روابط الصور
    discounts = serializers.SerializerMethodField()  # لجلب بيانات الخصومات

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'stock_quantity',
            'sku', 'barcode', 'product_condition', 'category', 'brand',
            'images', 'discounts', 'created_at', 'updated_at'
        ]

    def get_images(self, obj):
        return [image.image_url for image in obj.images.all()]  # جلب جميع روابط الصور

    def get_discounts(self, obj):
        return [
            {
                "discount_percentage": discount.discount_percentage,
                "discounted_price": discount.discounted_price,
                "start_date": discount.start_date,
                "end_date": discount.end_date
            }
            for discount in obj.discounts.all()
        ]

class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.StringRelatedField(many=True)  # التصنيفات الفرعية

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'subcategories']



class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'product', 'discount_percentage', 'discounted_price', 'start_date', 'end_date']

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # لعرض اسم المستخدم بدلًا من الـ ID

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'comment', 'created_at']


class TechnicalSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalSpecification
        fields = ['id', 'product', 'specification_name', 'specification_value']
        
        
from .models import Product, AdditionalDetail, Rating, Review

class AdditionalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalDetail
        fields = ['id', 'detail_name', 'detail_value', 'product']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'rating_value', 'created_at', 'product']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'review_text', 'created_at', 'product']
        
        
class ProductImageSerializer(serializers.ModelSerializer):
    additional_details = AdditionalDetailSerializer(many=True, read_only=True)
    ratings = RatingSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = ProductImage
        fields = ['id', 'name', 'description', 'price', 'category', 'colors', 'sizes', 'image', 'created_at', 'updated_at', 'additional_details', 'ratings', 'reviews']

