'''
from models import Target
import random

for _ in range(5):
    total = random.randint(80, 120)
    achieved = random.randint(50, total)
    failed = total - achieved
    Target.objects.create(
        target_quantity=total,
        achieved_quantity=achieved,
        failed_quantity=failed
    )
    
'''

from app.models import Target

Target.objects.create(target_quantity=100, achieved_quantity=80, failed_quantity=20)
Target.objects.create(target_quantity=150, achieved_quantity=120, failed_quantity=30)
Target.objects.create(target_quantity=200, achieved_quantity=170, failed_quantity=30)
Target.objects.create(target_quantity=180, achieved_quantity=160, failed_quantity=20)
Target.objects.create(target_quantity=220, achieved_quantity=210, failed_quantity=10)

print("Đã thêm dữ liệu mẫu")

