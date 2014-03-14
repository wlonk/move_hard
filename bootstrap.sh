#!/usr/bin/env bash

# Usage:
#   source bootstrap.sh
# Requirements:
#   virtualenvwrapper
#   postgres

# Let's do this in a virtualenv!
mkvirtualenv move_hard
workon move_hard

# setvirtualenvproject
setvirtualenvproject

# add2virtualenv
add2virtualenv "$(pwd)/move_hard"

# create .env
make_key() {
    if hash pwgen 2> /dev/null; then
        pwgen -ys 50 1
    else
        env LC_CTYPE=C tr -dc "a-zA-Z0-9-_\$\?" < /dev/urandom | head -c 50
    fi
}

cat << EOF > .env
DJANGO_SETTINGS_MODULE=move_hard.settings.base
DJANGO_SECRET_KEY=$(make_key)
EOF

unset -f make_key

# read in .env
export $(grep -v "^[ \t]*#" .env)

# pip install
pip install -r requirements/dev.txt

# createdb
createdb move_hard

# syncdb
django-admin.py syncdb --noinput

# migrate
django-admin.py migrate --noinput
