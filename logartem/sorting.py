# 2️⃣ خوارزميات الفرز (Sorting Algorithms)
# 🔹 تُستخدم لترتيب البيانات في شكل تصاعدي أو تنازلي.

# أمثلة:
# ✅ Bubble Sort – الفرز الفقاعي
# ✅ Selection Sort – فرز التحديد
# ✅ Insertion Sort – الفرز بالإدراج
# ✅ Merge Sort – فرز الدمج (فعال جدًا للأحجام الكبيرة)
# ✅ Quick Sort – الفرز السريع (أحد أسرع خوارزميات الفرز)

def bubble_sort(arr):
    n = len(arr)            # get the length of the array
    for i in range(n):      # iterate over the array
        for j in range(0, n-i-1):        # iterate over the array from 0 to n-i-1
            if arr[j] > arr[j+1]:         # if the current value is greater than the next value
                arr[j], arr[j+1] = arr[j+1], arr[j]    # swap the values
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))  # [11, 12, 22, 25, 34, 64, 90]

def selectionSort(arr):
    """ خوارزمية الفرز بالاختيار (Selection Sort)
        تقوم بترتيب قائمة من الأعداد تصاعديًا باستخدام خوارزمية الفرز بالاختيار
    """
    for i in range(len(arr)):
        min_index = i                   # it will store the index of the minimum value
        for j in range(i+1, len(arr)):  # it will iterate over the list to find the minimum value
            if arr[j] < arr[min_index]: # if the current value is less than the minimum value
                min_index = j           # update the minimum value index
        arr[i], arr[min_index] = arr[min_index], arr[i] # swap the minimum value with the current value
    return arr
print(selectionSort(arr))

def insertionSort(arr):
    """ خوارزمية الفرز بالإدراج (Insertion Sort)
        تقوم بترتيب قائمة من الأعداد تصاعديًا باستخدام خوارزمية الفرز بالإدراج
    """
    for i in range(1, len(arr)):        # iterate over the list from the second element
        key = arr[i]                    # store the current value
        j = i - 1                       # store the index of the previous value
        while j >= 0 and key < arr[j]:  # while the previous value is greater than the current value
            arr[j + 1] = arr[j]         # move the previous value to the next index
            j -= 1                      # decrement the index
        arr[j + 1] = key                # insert the current value
    return arr

print (insertionSort(arr))
# تُستخدم هذه الخوارزمية بشكل أساسي لأغراض تعليمية ولترتيب قوائم صغيرة. ومع ذلك، فهي ليست مناسبة للقوائم الكبيرة بسبب أدائها البطيء مقارنةً بخوارزميات الفرز الأكثر تقدمًا مثل Quick Sort أو Merge Sort.


def mergeSort(arr):
    """ خوارزمية الفرز بالدمج (Merge Sort)
        تقوم بترتيب قائمة من الأعداد تصاعديًا باستخدام خوارزمية الفرز بالدمج
        دالة mergeSort تقوم بترتيب قائمة من الأعداد تصاعديًا باستخدام خوارزمية الفرز بالدمج (Merge Sort). هذه الخوارزمية هي واحدة من خوارزميات الفرز الأكثر كفاءة وتتبع نهج الفرز بالتقسيم والدمج (Divide and Conquer). الفكرة الأساسية لهذه الخوارزمية هي تقسيم القائمة إلى أجزاء صغيرة، ثم فرز هذه الأجزاء ودمجها معًا للحصول على قائمة مرتبة.
    """
    if len(arr) > 1:
        mid = len(arr) // 2         # get the middle index
        L = arr[:mid]               # get the left half of the list
        R = arr[mid:]               # get the right half of the list
        mergeSort(L)                # sort the left half
        mergeSort(R)                # sort the right half
        
        i = j = k = 0              # initialize the counters i to get index for current left, J right, K  main lists    
        while i < len(L) and j < len(R):    # while the counters are less than the length of the lists
            if L[i] < R[j]:                 # if the left value is less than the right value
                arr[k] = L[i]               # assign the left value to the current index
                i += 1                      # increment the left counter
            else:
                arr[k] = R[j]               # assign the right value to the current index
                j += 1
            k += 1
        while i < len(L):                # while the left counter is less than the length of the left list
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr

print(mergeSort(arr))

def quickSort(arr):
    """ خوارزمية الفرز السريع (Quick Sort)
        تقوم بترتيب قائمة من الأعداد تصاعديًا باستخدام خوارزمية الفرز السريع
        خوارزمية الفرز السريع (Quick Sort) هي واحدة من أسرع خوارزميات الفرز وتتبع نهج الفرز بالتقسيم والتغليق (Divide and Conquer). تقوم هذه الخوارزمية بتقسيم القائمة إلى أجزاء صغيرة، ثم ترتيب هذه الأجزاء بشكل مستقل قبل دمجها معًا للحصول على قائمة مرتبة.
    """
    if len(arr) <= 1:           # if the length of the list is less than or equal to 1
        return arr              # return the list
    pivot = arr[len(arr) // 2]  # get the pivot element
    left = [x for x in arr if x < pivot]  # get the elements less than the pivot
    
    middle = [x for x in arr if x == pivot]  # get the elements equal to the pivot
    right = [x for x in arr if x > pivot]    # get the elements greater than the pivot
    return quickSort(left) + middle + quickSort(right)  # return the sorted list

print(quickSort(arr))
