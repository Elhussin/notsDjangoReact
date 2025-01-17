from django.db import models

from django.contrib.auth.models import User


class Branch(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} {self.location}"

class BranchManager(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="branch_managers")
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="branch_name")
    assigned_at = models.DateTimeField(auto_now_add=True)
    status=models.BooleanField(default= True)
    # منع تعيين نفس المدير لاكثر من فرع 
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
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="branch")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_shop')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.order_number} - {self.status}"


from django.db import models

class Company(models.Model):
    """
    Model to represent company data in the system.
    Includes essential details such as name, address, contact, and company type.
    """

    # Choices for the type of company
    COMPANY_TYPE_CHOICES = [
        ('client', 'Client'),       # A customer or client
        ('agent', 'Agent'),         # A representative or agent
        ('supplier', 'Supplier'),   # A supplier or insurance provider
    ]

    name = models.CharField(
        max_length=255,
        verbose_name="Company Name",
        help_text="The official name of the company."
    )
    address = models.TextField(
        verbose_name="Company Address",
        help_text="The physical or mailing address of the company."
    )
    contact_number = models.CharField(
        max_length=15,
        verbose_name="Contact Number",
        help_text="The primary phone number to contact the company."
    )
    email = models.EmailField(
        verbose_name="Email Address",
        help_text="The company's email address.",
        null=True,
        blank=True
    )
    website = models.URLField(
        verbose_name="Website",
        help_text="The company's official website URL.",
        null=True,
        blank=True
    )
    logo = models.ImageField(
        upload_to='company_logos/',
        verbose_name="Company Logo",
        help_text="Upload the company's logo (optional).",
        null=True,
        blank=True
    )
    description = models.TextField(
        verbose_name="Description",
        help_text="A brief description of the company (optional).",
        null=True,
        blank=True
    )
    registration_number = models.CharField(
        max_length=50,
        verbose_name="Registration Number",
        help_text="The company's official registration number (optional).",
        null=True,
        blank=True
    )
    tax_number = models.CharField(
        max_length=50,
        verbose_name="Tax Number",
        help_text="The company's tax identification number (optional).",
        null=True,
        blank=True
    )
    company_type = models.CharField(
        max_length=10,
        choices=COMPANY_TYPE_CHOICES,
        verbose_name="Company Type",
        help_text="The type of the company (e.g., Client, Agent, Supplier)."
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
        help_text="The date and time when the record was created."
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Updated At",
        help_text="The date and time when the record was last updated."
    )

    def __str__(self):
        """
        String representation of the model.
        Returns the name of the company.
        """
        return self.name

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ['name']  # Sort companies alphabetically by name



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
    name = models.CharField(max_length=255, verbose_name="Product Name")
    description = models.TextField(verbose_name="Description")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products', verbose_name="Category")
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="Product Image")
    colors = models.ManyToManyField(Color, related_name='products', verbose_name="Colors")
    sizes = models.ManyToManyField(Size, related_name='products', verbose_name="Sizes")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date Added")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")
    # additional_details = models.ManyToManyField(AdditionalDetail, related_name='products', verbose_name="Additional Details")
    # ratings = models.ManyToManyField(Rating, related_name='products', verbose_name="Ratings")
    # reviews = models.ManyToManyField(Review, related_name='products', verbose_name="Reviews")
    stock_quantity = models.IntegerField()
    sku = models.CharField(max_length=50, unique=True)
    barcode = models.CharField(max_length=50, unique=True, null=True, blank=True)
    product_condition = models.CharField(max_length=50, choices=[('new', 'New'), ('used', 'Used')], default='new')
    brand = models.ForeignKey('Brand', on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

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

# class Brand(models.Model):
#     name = models.CharField(max_length=255, unique=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name

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
