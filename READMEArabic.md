# NotsDjango Project

NotsDjango هو مشروع Django متعدد الوظائف يوفر واجهة برمجة تطبيقات (API) قوية باستخدام Django REST Framework. يهدف المشروع إلى دعم التطبيقات الحديثة من خلال توفير ميزات مثل إدارة المستخدمين، المصادقة عبر الرموز (JWT)، والتكامل مع الجبهة الأمامية باستخدام CORS.

## المميزات الرئيسية

- **إدارة المستخدمين**: تسجيل الدخول/التسجيل باستخدام البريد الإلكتروني أو اسم المستخدم.
- **المصادقة باستخدام JWT**: استخدام JSON Web Tokens للمصادقة الآمنة.
- **واجهة برمجة التطبيقات (API)**: توفر واجهة برمجة تطبيقات قابلة للتخصيص باستخدام Django REST Framework.
- **دعم العملات المالية**: استخدام مكتبة `djmoney` لإدارة الحقول المالية.
- **التاريخ والسجلات**: تتبع التغييرات باستخدام `django-simple-history`.
- **التوثيق التلقائي للـ API**: توليد وثائق OpenAPI باستخدام `drf-spectacular`.
- **دعم CORS**: تمكين التفاعل بين الجهة الأمامية والخلفية.
- **إدارة المنتجات والتقارير**: دعم تطبيقات متعددة لإدارة العملاء، الموارد البشرية، والتقارير المالية.
- **دعم Django Admin**: يوفر واجهة إدارة متكاملة.
- **تم بناء الواجهة الأمامية باستخدام React**: لتحقيق تجربة مستخدم حديثة وسلسة.

## المتطلبات الأساسية

قبل بدء تشغيل المشروع، تأكد من تثبيت الأدوات التالية:

- Python 3.8+
- PostgreSQL (للإنتاج)
- Node.js (لتشغيل React)

## التثبيت

### 1. استنساخ المشروع

```bash
git clone https://github.com/your-repo/notsDjango.git
cd notsDjango
```

### 2. إعداد البيئة الافتراضية وتثبيت المتطلبات

```bash
python -m venv venv
source venv/bin/activate  # على نظام Linux/MacOS
venv\Scripts\activate     # على نظام Windows
pip install -r requirements.txt
```

### 3. إعداد المتغيرات البيئية

قم بإنشاء ملف `.env` وإضافة البيانات التالية:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
ACCESS_TOKEN_LIFETIME_MINUTES=15
REFRESH_TOKEN_LIFETIME_DAYS=7
```

## البنية العامة للمشروع

### التطبيقات المحلية

- `notes` : إدارة الملاحظات.
- `waseel` : وظائف خاصة بالمشروع (حسب الحاجة).
- `accounting` : إدارة الحسابات المالية.
- `crm` : إدارة العلاقات مع العملاء.
- `hrm` : إدارة الموارد البشرية.
- `reporting` : إنشاء التقارير.
- `product` : إدارة المنتجات.
- `users` : إدارة المستخدمين.

### المكتبات الخارجية

- `Django REST Framework` : لإنشاء واجهة برمجة التطبيقات.
- `django-cors-headers` : لدعم طلبات CORS.
- `dj-rest-auth` : لتسهيل تسجيل الدخول/التسجيل.
- `allauth` : لإدارة التسجيل والمصادقة.
- `djmoney` : لإدارة الحقول المالية.
- `drf-spectacular` : لتوليد وثائق API.
- `React` : لإنشاء واجهة المستخدم الديناميكية والتفاعلية.

## الإنتاج

لتشغيل المشروع في بيئة الإنتاج، تأكد من:

- ضبط `DEBUG=False` في ملف `.env`.
- تكوين خادم WSGI مثل Gunicorn أو uWSGI.
- تكوين خادم الويب مثل Nginx أو Apache.
- تفعيل HTTPS باستخدام شهادة SSL.

## المساهمة

إذا كنت ترغب في المساهمة في هذا المشروع، يرجى فتح مشكلة (Issue) أو تقديم طلب سحب (Pull Request).

## الترخيص

هذا المشروع مرخص بموجب `MIT License`.

