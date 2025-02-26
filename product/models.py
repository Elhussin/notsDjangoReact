from django.db import models
from simple_history.models import HistoricalRecords
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)  # للفئات الفرعية
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Brand Name")
    description = models.TextField(blank=True, verbose_name="Description")
    logo = models.ImageField(upload_to='brands/logos/', blank=True, verbose_name="Brand Logo")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    history = HistoricalRecords()
    class Meta:
        verbose_name = "Brand"
        # verbose_name_plural = "Brands"
        ordering = ["-created_at"]
        
    def __str__(self):
        return self.name
    
# pip install django-simple-history


class Product(models.Model):
    # المعلومات الأساسية
    sku = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    
    # التسعير والمخزون
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock_quantity = models.IntegerField(default=0)
    stock_status = models.BooleanField(default=True)  # True = متوفر
    
    # SEO
    slug = models.SlugField(max_length=200, unique=True)
    meta_keywords = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)
    
    # التواريخ
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    related_products = models.ManyToManyField('self', blank=True)  # منتجات مرتبطة

    def __str__(self):
        return self.name
    
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    is_main = models.BooleanField(default=False)  # صورة رئيسية
    
    def __str__(self):
        return f"Image for {self.product.name}"
    
class Attribute(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
    
class AttributeValue(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, related_name='values')
    value = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return f"{self.attribute.name} - {self.value}"
    

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku = models.CharField(max_length=50, unique=True)  # مثل: TSHIRT-RED-XL
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    attributes = models.ManyToManyField(AttributeValue)  # الربط مع الخصائص
    
    def __str__(self):
        return f"{self.product.name} - {self.sku}"
   

class Warranty(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='warranty')
    duration = models.CharField(max_length=50)  # مثل "سنتان"
    terms = models.TextField()
    
    def __str__(self):
        return f"Warranty for {self.product.name}"
    

class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField()
    review = models.TextField()
    reviewed_by = models.ForeignKey('crm.Customer', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review for {self.product.name} by {self.reviewed_by.user.username}"
    
class ProductQuestion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    asked_by = models.ForeignKey('crm.Customer', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Question about {self.product.name} by {self.asked_by.user.username}"
    
class ProductAnswer(models.Model):
    question = models.OneToOneField(ProductQuestion, on_delete=models.CASCADE, related_name='answer')
    answer = models.TextField()
    answered_by = models.ForeignKey('crm.Customer', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Answer for {self.question.product.name} question by {self.answered_by.user.username}"
    
class ProductSpecification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='specifications')
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.key} - {self.value}"
    
    

class Discount(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='discounts')
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    
    def __str__(self):
        return f"{self.discount}% discount on {self.product.name}"
    
# class ProductOffer(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='offers')
#     offer = models.CharField(max_length=100)
#     start_date = models.DateField()
#     end_date = models.DateField()
    
#     def __str__(self):
#         return f"{self.offer} on {self.product.name}"

