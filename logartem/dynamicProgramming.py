# 5️⃣ خوارزميات البرمجة الديناميكية (Dynamic Programming Algorithms)
# 🔹 تُستخدم لحل المشكلات التي يمكن تقسيمها إلى مشكلات فرعية متكررة مع تخزين النتائج لتجنب إعادة الحساب.

# أمثلة:
# ✅ Fibonacci Sequence – حساب متتابعة فيبوناتشي
# ✅ Knapsack Problem – مشكلة الحقيبة
# ✅ Longest Common Subsequence (LCS) – إيجاد أطول سلسلة مشتركة بين سلسلتين

# dynamicProgramming.py

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
    
print(fibonacci(10))  # 55

# def fibonacci_memoization(n, memo):
#     if n in memo:
#         return memo[n]
#     if n <= 1:
#         return n
#     memo[n] = fibonacci_memoization(n-1, memo) + fibonacci_memoization(n-2, memo)
#     return memo[n]
# print(fibonacci_memoization(20, {}))  # 6765

# def fibonacci_tabulation(n):
#     dp = [0] * (n+1)
#     dp[1] = 1
#     for i in range(2, n+1):
#         dp[i] = dp[i-1] + dp[i-2]
#     return dp[n]

# print(fibonacci_tabulation(20))  # 6765

def Knapsack(weights, values, capacity, n):
    if n == 0 or capacity == 0:
        return 0
    if weights[n-1] > capacity:
        return Knapsack(weights, values, capacity, n-1)
    else:
        return max(values[n-1] + Knapsack(weights, values, capacity-weights[n-1], n-1), Knapsack(weights, values, capacity, n-1))
    
weights = [10, 20, 30]
values = [60, 100, 120] 
capacity = 50
n = len(values)
print(Knapsack(weights, values, capacity, n))  # 220

def LongestCommonSubsequence(X, Y, m, n):
    if m == 0 or n == 0:
        return 0
    if X[m-1] == Y[n-1]:
        return 1 + LongestCommonSubsequence(X, Y, m-1, n-1)
    else:
        return max(LongestCommonSubsequence(X, Y, m-1, n), LongestCommonSubsequence(X, Y, m, n-1))

X = "ABCBDABfg"
Y = "BDCAB"
print(LongestCommonSubsequence(X, Y, len(X), len(Y)))  # 4