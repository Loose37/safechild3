from rest_framework import serializers
from .models import Students
from .models import Roles
from .models import Route_1_events
from .models import Route_2_events


class StudentSerializer(serializers.Serializer):
    class Meta:
        model = Students
        fields = '__all__'


class RolesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Roles
        fields = '__all__'


class Route_1_eventsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route_1_events
        fields = '__all__'


class Route_2_eventsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route_2_events
        fields = '__all__'
