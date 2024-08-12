from django.db import models
from django.utils import timezone

#Quick learn: 
# auto_now_add, lập giá trị là thời điểm hiện tại và ko thay đổi sau này
# auto_now, lập giá trị là lần cập nhật của đối tượng
# timezone.now, lập giá trị là thời điểm hiện tại, sau này có thể thay đổi được

class Product(models.Model):
    name = models.CharField(max_length=255)
    image = models.URLField(blank=True)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inventory = models.IntegerField()
    rating = models.FloatField()
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    selled= models.IntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)
    
    # Ràng buộc
    class Meta: 
        constraints = [
            models.CheckConstraint(check=models.Q(price__gte=0), name='price_gte_0'),
            models.CheckConstraint(check=models.Q(inventory__gte=0), name='inventory_gte_0'),
            models.CheckConstraint(check=models.Q(rating__gte=0, rating__lte=5), name='rating_range'),
            models.CheckConstraint(check=models.Q(discount__gte=0, discount__lte=100), name='discount_range'),
            models.CheckConstraint(check=models.Q(selled__gte=0), name='selled_gte_0'),
        ]
    
    def __str__(self):
        return self.name