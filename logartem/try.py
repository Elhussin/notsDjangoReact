

unsorted_list = [64, 25, 12, 22, 11]


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


