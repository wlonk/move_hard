"""
Django settings for move_hard project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

import os
from os.path import abspath, basename, dirname, normpath, join
from sys import path

from django.core.exceptions import ImproperlyConfigured

import dj_database_url


def get_env_variable(var_name):
    """ Get the environment variable or return exception """
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = "Set the {} environment variable".format(var_name)
        raise ImproperlyConfigured(error_msg)


########## PATH CONFIGURATION
# Absolute filesystem path to the Django project directory:
DJANGO_ROOT = dirname(dirname(abspath(__file__)))

# Absolute filesystem path to the top-level project folder:
SITE_ROOT = dirname(DJANGO_ROOT)

# Site name:
SITE_NAME = basename(DJANGO_ROOT)

# Add our project to our pythonpath, this way we don't need to type our project
# name in our dotted import paths:
path.append(DJANGO_ROOT)
########## END PATH CONFIGURATION

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

SECRET_KEY = get_env_variable('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

TEMPLATE_DIRS = (
    normpath(join(SITE_ROOT, 'templates')),
)

ALLOWED_HOSTS = []


# Application definition

DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'south',
    'pipeline',
    'rest_framework',
)

LOCAL_APPS = (
    'api',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.gzip.GZipMiddleware',
    'pipeline.middleware.MinifyHTMLMiddleware',
)

ROOT_URLCONF = 'move_hard.urls'

WSGI_APPLICATION = 'move_hard.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        default='postgres://localhost/{}'.format(SITE_NAME)
    )
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = normpath(join(SITE_ROOT, 'assets'))
STATICFILES_DIRS = (
    normpath(join(SITE_ROOT, 'static')),
)
STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'

PIPELINE_CSS = {
    'all': {
        'source_filenames': (
            'css/vendor/bootstrap.css',
            'css/vendor/bootstrap-theme.css',
            'less/main.less',
        ),
        'output_filename': 'css/all.css',
    },
}

PIPELINE_COMPILERS = (
    'pipeline.compilers.less.LessCompiler',
)

PIPELINE_JS = {
    'libraries': {
        'source_filenames': (
            'js/vendor/modernizr.js',
            'js/vendor/jquery.js',
            'js/vendor/bootstrap.js',
            'js/vendor/showdown.js',
            'js/vendor/handlebars.js',
            'js/vendor/ember.js',
            'js/vendor/ember-data.js',
            'js/vendor/ember-data-django-rest-adapter.js',
            # 'js/vendor/localstorage_adapter.js',
        ),
        'output_filename': 'js/libraries.js',
    },
    'templates': {
        'source_filenames': (
            'templates/*.hbs',
            'templates/moves/*.hbs',
        ),
        'output_filename': 'js/templates.js'
    },
    'application': {
        'source_filenames': (
            'js/main.js',
            'js/adapters/application.js',
            'js/serializers/application.js',
            'js/router.js',
            'js/models/*.js',
            'js/controllers/moves/*.js',
            'js/routes/*.js',
        ),
        'output_filename': 'js/application.js'
    }
}

PIPELINE_TEMPLATE_EXT = '.hbs'
PIPELINE_TEMPLATE_FUNC = 'Ember.Handlebars.compile'
PIPELINE_TEMPLATE_NAMESPACE = 'window.Ember.TEMPLATES'
PIPELINE_TEMPLATE_SEPARATOR = '/'


# Django REST Framework
REST_FRAMEWORK = {
    'FILTER_BACKEND': 'rest_framework.filters.DjangoFilterBackend'
}
