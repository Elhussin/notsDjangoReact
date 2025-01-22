from django.db import models

from django.contrib.auth.models import User


class Branch(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.location}"

class BranchManager(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="managed_branches")
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="managers")
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)
    notes = models.TextField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user'], name='unique_user_per_branch')
        ]

    def __str__(self):
        return f"{self.user.username} - {self.branch.name}"
    

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending_shop', 'Pending In Shop'),
        ('pending_lab', 'Pending In Lab'),
        ('send_lab', 'Send To Lab'),
        ('in_lab', 'In Lab'),
        ('in_shop', 'In Shop'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    order_number = models.CharField(max_length=20, unique=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="orders")
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_shop')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.order_number} - {self.status}"



class Company(models.Model):
    COMPANY_TYPE_CHOICES = [
        ('client', 'Client'),
        ('agent', 'Agent'),
        ('supplier', 'Supplier'),
    ]

    name = models.CharField(max_length=255)
    address = models.TextField()
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    registration_number = models.CharField(max_length=50, null=True, blank=True)
    tax_number = models.CharField(max_length=50, null=True, blank=True)
    company_type = models.CharField(max_length=10, choices=COMPANY_TYPE_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.company_type}"


class Factory(models.Model):
    """
    Factory model to represent factory details, including name, location, 
    establishment date, owner, production capacity, contact information, and status.
    """
    name = models.CharField(
        max_length=255, 
        verbose_name="Factory Name", 
        help_text="The name of the factory."
    )  # Name of the factory
    location = models.CharField(
        max_length=255, 
        verbose_name="Location", 
        help_text="The physical location or address of the factory."
    )  # Factory location
    established_date = models.DateField(
        auto_now=True,
        verbose_name="Established Date", 
        help_text="The date when the factory was established."

    )  # Date the factory was established
    owner_name = models.CharField(
        null=True,
        blank=True,
        max_length=255, 
        verbose_name="Owner Name", 
        help_text="The full name of the factory owner."
    )  # Name of the factory owner
    capacity = models.IntegerField(
        null=True,
        blank=True,
        default=0,
        verbose_name="Production Capacity", 
        help_text="The production capacity of the factory (e.g., units per day)."
    )  # Factory production capacity
    contact_email = models.EmailField(
        verbose_name="Contact Email", 
        help_text="The email address for contacting the factory."
    )  # Contact email for the factory
    is_active = models.BooleanField(
        default=True, 
        verbose_name="Active", 
        help_text="Indicates whether the factory is currently operational."
    )  # Whether the factory is operational

    def __str__(self):
        """String representation of the Factory model."""
        return self.name

    class Meta:
        verbose_name = "Factory"
        verbose_name_plural = "Factories"
        ordering = ['name']  # Sort factories alphabetically by name



# موديل Brand مع ForeignKey لـ Factory و Company
class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Brand Name")
    # factory = models.ForeignKey(Factory, on_delete=models.SET_NULL, null=True, blank=True, related_name='brands', verbose_name="Factory")
    # company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name='brands', verbose_name="Company")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    logo = models.ImageField(upload_to='brands/logos/', null=True, blank=True, verbose_name="Brand Logo")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Brand"
        verbose_name_plural = "Brands"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


# موديل اللون

class Color(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Color Name")

    def __str__(self):
        return self.name

# موديل القياس
class Size(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Size Name")

    def __str__(self):
        return self.name
    

# موديل المواصفات التقنية
class TechnicalSpecification(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='technical_specifications', verbose_name="Product")
    specification_name = models.CharField(max_length=255, verbose_name="Specification Name")  # مثل الوزن أو المواد
    specification_value = models.CharField(max_length=255, verbose_name="Specification Value")  # مثل 1 كغم، قماش قطني، إلخ

    def __str__(self):
        return f"{self.specification_name}: {self.specification_value}"

    class Meta:
        verbose_name = "Technical Specification"
        verbose_name_plural = "Technical Specifications"
 
 
        
class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    colors = models.ManyToManyField(Color, related_name='products')
    sizes = models.ManyToManyField(Size, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stock_quantity = models.IntegerField()
    sku = models.CharField(max_length=50, unique=True)
    barcode = models.CharField(max_length=50, unique=True, null=True, blank=True)
    product_condition = models.CharField(max_length=50, choices=[('new', 'New'), ('used', 'Used')], default='new')
    brand = models.ForeignKey('Brand', on_delete=models.CASCADE, related_name='products')
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name




class AdditionalDetail(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='additional_details', verbose_name="Product")
    detail_name = models.CharField(max_length=255, verbose_name="Detail Name")  # مثل "التوصيل"، "الضمان"
    detail_value = models.TextField(verbose_name="Detail Value")  # مثل "يتم التوصيل خلال 5 أيام"، "ضمان لمدة عام"
    
    def __str__(self):
        return f"{self.detail_name}: {self.detail_value}"

    class Meta:
        verbose_name = "Additional Detail"
        verbose_name_plural = "Additional Details"
        

class Category(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategories')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField(max_length=255)
    is_main = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.product.name}"
    
class Discount(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='discounts')
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"Discount for {self.product.name}"



# موديل التقييمات
class Rating(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='ratings', verbose_name="Product")
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name="User")
    rating_value = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)], verbose_name="Rating Value")  # تقييم من 1 إلى 5
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date Added")

    def __str__(self):
        return f"Rating for {self.product.name} by {self.user.username}"

    class Meta:
        verbose_name = "Rating"
        verbose_name_plural = "Ratings"


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)  # أو User مخصص إذا لديك
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # تقييم من 1 إلى 5
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product.name} by {self.user.username}"
    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

class Subscription(models.Model):
    SUBSCRIPTION_TYPES = [
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
        ('lifetime', 'Lifetime'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions', verbose_name="User")  # ربط الاشتراك بالمستخدم
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_TYPES, verbose_name="Subscription Type")  # نوع الاشتراك
    start_date = models.DateTimeField(auto_now_add=True, verbose_name="Start Date")  # تاريخ بدء الاشتراك
    end_date = models.DateTimeField(verbose_name="End Date")  # تاريخ انتهاء الاشتراك
    is_active = models.BooleanField(default=True, verbose_name="Active")  # حالة الاشتراك (نشط أو غير نشط)

    def __str__(self):
        return f"{self.user.username} - {self.subscription_type}"

    class Meta:
        verbose_name = "Subscription"
        verbose_name_plural = "Subscriptions"


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer")
    phone = models.CharField(max_length=15)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


class Shipping(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="shipping")
    address = models.TextField()
    shipping_method = models.CharField(max_length=50, choices=[('standard', 'Standard'), ('express', 'Express')])
    shipping_date = models.DateTimeField(null=True, blank=True)
    is_delivered = models.BooleanField(default=False)

    def __str__(self):
        return f"Shipping for {self.order.order_number}"
    
class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="invoices")
    issue_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Invoice {self.invoice_number} for Order {self.order.order_number}"
    
class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=[('cash', 'Cash'), ('card', 'Card')])
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment of {self.amount} for Invoice {self.invoice.invoice_number}"

class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="inventory")
    quantity = models.IntegerField()
    movement_type = models.CharField(max_length=50, choices=[('in', 'In'), ('out', 'Out')])
    movement_date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Inventory movement for {self.product.name}"
    
class Tax(models.Model):
    name = models.CharField(max_length=100)
    rate = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.rate}%)"
    
    
class Discount(models.Model):
    DISCOUNT_TYPES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="discounts")
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPES)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"Discount for {self.product.name}"