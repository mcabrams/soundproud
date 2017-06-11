from .utility import env_get_or_warn

DOMAIN = env_get_or_warn('DOMAIN')
POSTGRESQL_PASSWORD = env_get_or_warn('POSTGRESQL_PASSWORD')
PROTOCOL = env_get_or_warn('PROTOCOL')
SECRET_KEY = env_get_or_warn('SECRET_KEY')
