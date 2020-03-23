from django import template

register = template.Library()

@register.filter
def seperator(value):
    return f"{value:,}"