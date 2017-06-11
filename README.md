# Soundproud

## Getting started
Copy and rename `web.env.example` to `web.env` with necessary
secrets/configured environment variables.

`docker-compose -f docker-compose.yml -f docker-compose.test.yml build`
`docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d`
`docker-compose exec web bash`

Then run in the container
```
./manage.py migrate
```

## Tests

Unit/Integration:
```
./manage.py test --keepdb
```

Acceptance:
```
./manage.py test --keepdb acceptance_tests
```
