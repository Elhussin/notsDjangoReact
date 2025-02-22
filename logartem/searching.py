# logartiem
# 1️⃣ خوارزميات البحث (Searching Algorithms)
# أمثلة:
# ✅ Linear Search – البحث الخطي
# ✅ Binary Search – البحث الثنائي (أسرع من البحث الخطي عند الت
#  البحث الخطي (Linear Search)
#  تقوم بالبحث عن عنصر معين داخل قائمة غير مرتبة، 

def linearSearch(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return f" value: {arr[i]} In index: {i}"
    return "Not found"

input_list = [10, 25, 7, 30, 15]
target = 7
print(linearSearch(input_list, target))



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

sorted_list = [1, 3, 5, 7, 9, 11, 13, 15]
print(binarySearch(sorted_list, target))

