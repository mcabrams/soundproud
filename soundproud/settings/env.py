from .utility import env_get_or_warn

POSTGRESQL_PASSWORD = env_get_or_warn('POSTGRESQL_PASSWORD')
PROD = env_get_or_warn('PROD')
SECRET_KEY = env_get_or_warn('SECRET_KEY')
SOUNDCLOUD_CLIENT_ID = env_get_or_warn('SOUNDCLOUD_CLIENT_ID')
SOUNDCLOUD_CLIENT_SECRET = env_get_or_warn('SOUNDCLOUD_CLIENT_SECRET')
SOUNDCLOUD_USERNAME = env_get_or_warn('SOUNDCLOUD_USERNAME')
SOUNDCLOUD_PASSWORD = env_get_or_warn('SOUNDCLOUD_PASSWORD')
