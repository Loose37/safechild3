from django.db import models
import uuid

# Create your models here.


class Students(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    student_unique_ID = models.CharField(max_length=255)
    route = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name


class Roles(models.Model):
    email = models.EmailField(max_length=254)
    role = models.CharField(max_length=254)
    studentID = models.ForeignKey(Students, on_delete=models.CASCADE)
    staffID = models.UUIDField(default=uuid.uuid4)

    def __strg__(self):
        return self.role


class Route_1_events(models.Model):
    studentID = models.ForeignKey(Students, on_delete=models.CASCADE)
    got_on_bus = models.BooleanField
    got_off_bus = models.BooleanField
    Time_when_got_on_bus = models.DateTimeField
    Time_when_got_off_bus = models.DateTimeField
    got_to_class = models.BooleanField
    got_off_class = models.BooleanField
    Time_when_got_to_class = models.DateTimeField
    Time_when_got_out_of_class = models.DateTimeField

    def __str__(self):
        return self.studentID


class Route_2_events(models.Model):
    studentID = models.ForeignKey(Students, on_delete=models.CASCADE)
    got_on_bus = models.BooleanField
    got_off_bus = models.BooleanField
    Time_when_got_on_bus = models.DateTimeField
    Time_when_got_off_bus = models.DateTimeField
    got_to_class = models.BooleanField
    got_off_class = models.BooleanField
    Time_when_got_to_class = models.DateTimeField
    Time_when_got_out_of_class = models.DateTimeField

    def __str__(self):
        return self.studentID
