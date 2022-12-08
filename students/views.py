from django.shortcuts import render
from django.http import HttpResponse
from . models import Students
from . models import Roles
from rest_framework.response import Response
from . serializers import StudentSerializer, Route_1_eventsSerializer, RolesSerializer
from rest_framework.decorators import api_view


# Create your views here.


def say_hello(request):
    return HttpResponse('Hello World')       # returns hello world


@api_view(['GET'])
def student_list(request):
    return Response('ok')                   # returns ok


@api_view(['GET'])
def all_students_list(request):
    serializer = StudentSerializer(Students)

    return Response(serializer.data)        # returns empty object


@api_view(['GET'])
def students3(request):
    detail = [{"first_name": detail.first_name, "last_name": detail.last_name, "image": detail.image, "student_unique_ID": detail.student_unique_ID, "route": detail.route}
              for detail in Students.objects.all()]
    return Response(detail)                # returns the info in database table


@ api_view(['GET'])
def roles(request):
    roles = Roles.objects.all()
    serializer = RolesSerializer(roles, many=True)
    return Response(serializer.data)

    # detail = [{"email": detail.email, "role": detail.role, "studentID": detail.studentID, "staffID": detail.staffID}
    #           for detail in Roles.objects.all()]
    # print(detail)
    # return Response(detail)


# @api_view(['POST'])
# def children(request):
#   children = Students.objects.filter(route=)


@ api_view(['POST'])
def route_1_events(request):
    serializer = Route_1_eventsSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)  # is for post. not tested
