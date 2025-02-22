# خوارزمية البحث في الشبكة (Breadth-First Search - BFS)
# 3️⃣ خوارزميات التصفح (Traversal Algorithms)
# 🔹 تُستخدم لاستكشاف جميع العقد (Nodes) في هيكل بيانات معين مثل الشجرة (Tree) أو الرسم البياني (Graph).

# أمثلة:
# ✅ Depth First Search (DFS) – البحث المتعمق
# ✅ Breadth First Search (BFS) – البحث بالعرض



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
