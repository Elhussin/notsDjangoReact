
# خوارزمية البحث في شجرة ثنائية
# قوم بتنفيذ عملية التصفح (Traversal) على شجرة ثنائية باستخدام أسلوب البحث بالعمق (DFS)
# 🎯 ملخص الفكرة
# 1️⃣ التصفح (Traversal) هو عملية زيارة كل العقد في الشجرة وفق ترتيب معين.
# 2️⃣ لدينا 3 طرق رئيسية:
# Inorder (اليسار → الجذر → اليمين)
# Preorder (الجذر → اليسار → اليمين)
# Postorder (اليسار → اليمين → الجذر)
# 3️⃣ نستخدم التكرار (Recursion) لاستدعاء نفس الدالة على الفروع اليمنى واليسرى.
# 4️⃣ يمكن تطبيق هذه الدوال على أي شجرة ثنائية، وهي مفيدة في البحث ومعالجة البيانات.

def inorder_traversal(root):
    if root is None:
        return []
    return inorder_traversal(root.left) + [root.value] + inorder_traversal(root.right)

def preorder_traversal(root):
    if root is None:
        return []
    return [root.value] + preorder_traversal(root.left) + preorder_traversal(root.right)

def postorder_traversal(root):
    if root is None:
        return []
    return postorder_traversal(root.left) + postorder_traversal(root.right) + [root.value]
 
# تعريف الشجرة
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# إنشاء الشجرة
root = Node('A')
root.left = Node('B')
root.right = Node('C')
root.left.left = Node('D')
root.left.right = Node('E')
root.right.right = Node('F')

# تنفيذ عمليات التصفح
print("Inorder Traversal:", inorder_traversal(root))   # ['D', 'B', 'E', 'A', 'C', 'F']
print("Preorder Traversal:", preorder_traversal(root)) # ['A', 'B', 'D', 'E', 'C', 'F']
print("Postorder Traversal:", postorder_traversal(root)) # ['D', 'E', 'B', 'F', 'C', 'A']

# Inorder	🔹 استرجاع البيانات بترتيب تصاعدي ✅ 🔹 البحث في شجرة البحث الثنائية (BST) ✅
# Preorder	🔹 استنساخ الأشجار ✅ 🔹 حفظ الشجرة في ملف واستعادتها ✅ 🔹 إيجاد المسارات في الذكاء الاصطناعي ✅
# Postorder	🔹 حذف الشجرة ✅ 🔹 تقييم التعبيرات الرياضية ✅ 🔹 حل مشكلات التبعيات في الأنظمة ✅
# 1️⃣ إذا كنت تحتاج إلى فرز البيانات، استخدم Inorder Traversal.
# 2️⃣ إذا كنت تريد حفظ أو استنساخ الشجرة، استخدم Preorder Traversal.
# 3️⃣ إذا كنت تريد حذف الشجرة أو تقييم العمليات الحسابية، استخدم Postorder Traversal.