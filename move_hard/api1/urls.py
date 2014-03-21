from django.conf.urls import patterns, url
from django.views.generic import TemplateView


urlpatterns = patterns('',  # NOQA
    url(r'^$', TemplateView.as_view(template_name='api1/base.html')),
)
