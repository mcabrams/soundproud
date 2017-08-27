from .utility import env_get_or_warn

DOMAIN = env_get_or_warn('DOMAIN')
HOST = env_get_or_warn('HOST')
POSTGRESQL_PASSWORD = env_get_or_warn('POSTGRESQL_PASSWORD')
PROD = env_get_or_warn('PROD')
PROTOCOL = env_get_or_warn('PROTOCOL')
SECRET_KEY = env_get_or_warn('SECRET_KEY')
SOUNDCLOUD_CLIENT_ID = env_get_or_warn('SOUNDCLOUD_CLIENT_ID')
SOUNDCLOUD_CLIENT_SECRET = env_get_or_warn('SOUNDCLOUD_CLIENT_SECRET')
SOUNDCLOUD_USERNAME = env_get_or_warn('SOUNDCLOUD_USERNAME')
SOUNDCLOUD_PASSWORD = env_get_or_warn('SOUNDCLOUD_PASSWORD')
