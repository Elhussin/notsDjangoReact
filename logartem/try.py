# logartiem


#  البحث الخطي (Linear Search)
#  تقوم بالبحث عن عنصر معين داخل قائمة غير مرتبة، 

input_list = [10, 25, 7, 30, 15]
target = 0

def linearSearch(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return f" value: {arr[i]} In index: {i}"
    return "Not found"


print(linearSearch(input_list, target))

sorted_list = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7


# البحث الثنائي لإيجاد عنصر داخل قائمة مرتبة
# البحث الثنائي (Binary Search)

def binarySearch(arr, target):
    left= 0                         # First index
    right = len(arr) - 1            # Last index
    while left <= right:            # While the left index is less than or equal to the right index
        
        mid = (left + right) // 2   # Middle index
        print(left, right,  mid)
        if arr[mid] == target:      # If the middle index is equal to the target
            return f" value: {arr[mid]} In index: {mid}"
        elif arr[mid] < target:     # If the middle index is less than the target
            left = mid + 1          # ignore the left half of the list
        else:
            right = mid - 1         # ignore the right half of the list
        
            
    return "Not found"

print(binarySearch(sorted_list, target))



unsorted_list = [64, 25, 12, 22, 11]

def selectionSort(arr):
    """ خوارزمية الفرز بالاختيار (Selection Sort)
        تقوم بترتيب قائمة من الأعداد تصاعديًا باستخدام خوارزمية الفرز بالاختيار
    """
    for i in range(len(arr)):
        min_index = i # it will store the index of the minimum value
        for j in range(i+1, len(arr)): # it will iterate over the list to find the minimum value
            if arr[j] < arr[min_index]: # if the current value is less than the minimum value
                min_index = j        # update the minimum value index
        arr[i], arr[min_index] = arr[min_index], arr[i] # swap the minimum value with the current value

    return arr

print(selectionSort(unsorted_list))


# قوم بإيجاد جميع القواسم الصحيحة (Divisors) للعدد المدخل
import math
def divisors(num):
    """ 
    تقوم بإيجاد جميع القواسم الصحيحة للعدد المدخل
    """
    divisors = []
    for i in range(1, int(math.sqrt(num)) + 1):
        if num % i == 0:
            divisors.append(i)
            if i != num // i:
                divisors.append(num // i)
    return divisors

print(divisors(36))
print(selectionSort(divisors(36)))


# خوارزمية البحث في الشبكة (Breadth-First Search - BFS)
from collections import deque

def bfs(graph, start):
    visited = set()  # Set to keep track of visited nodes
    queue = deque([start])  # Initialize the queue with deque
    while queue:  # While there are elements in the queue
        vertex = queue.popleft()  # pop from left (O(1) time complexity)
        if vertex not in visited:
            visited.add(vertex)
            queue.extend(graph[vertex])
    return visited

# مثال الشبكة
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}

print(bfs(graph, 'A'))


#  خوارزمية البحث أولًا في العمق (DFS)

def DFS(graph, start):
    visited = set()
    stack = [start]
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            stack.extend(graph[vertex])
    return visited

print(DFS(graph, 'A'))

# خوارزمية البحث في شجرة ثنائية
# قوم بتنفيذ عملية التصفح (Traversal) على شجرة ثنائية باستخدام أسلوب البحث بالعمق (DFS)

def inorder(root):
    inorder_list=[]
    if root:
        inorder(root.left)
        print(root.value)
        inorder_list.append(root.value)
        print(inorder_list)
        inorder(root.right)
    
def preorder(root):
    postorder_list=[]
    if root:
        postorder_list.append(root.value)
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    postorderList=[]
    if root:
        postorder(root.left)
        postorder(root.right)
        postorderList.append(root.value)
        
    return postorderList
    
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

root = Node('A')
root.left = Node('B')
root.right = Node('C')
root.left.left = Node('D')
root.left.right = Node('E')
root.right.right = Node('F')

print ("DFS Traversal" , root.value)
print("Inorder Traversal", inorder(root))
print("Preorder Traversal", preorder(root))
print("Postorder Traversal", postorder(root))