from django import template
from django.http import HttpResponse
import json

register = template.Library()

@register.filter
def json_response(value):
    return HttpResponse(
        json.dumps(value),
        content_type = 'application/javascript; charset=utf8'
    )