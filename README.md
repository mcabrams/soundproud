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
./manage.py persist_new_tracks
```

Then outside run
`docker-compose run assets bash`

Then run in the container

```
npm run watch
```

You may also want to run `flow-typed install`, then `flow` as another job to
see typechecking via static analysis.


```
Then open localhost:8082/stream
```


## Testing production setup locally (without swarm)

Build and push images:

```
docker build -t ./web mcabrams/soundproud_web:x.y.z
docker push mcabrams/soundproud_web:x.y.z
docker build -t ./nginx mcabrams/soundproud_nginx:x.y.z
docker push mcabrams/soundproud_nginx:x.y.z
docker build -t ./nginx mcabrams/soundproud_assets:x.y.z
docker push mcabrams/soundproud_assets:x.y.z
```

Update `docker-compose.production.yml` with correct images
i.e.

```
  nginx:
    image: mcabrams/soundproud_nginx:x.y.z
```

Spin up instance of postgres container and expose a port

```
docker run -d -p 5435:5432 postgres:9.3
```

Edit `web.production.env` appropriately:

```
...
DATABASE_URL=postgres://postgres:mysecretpassword@db:5435/postgres
...
```

Then run

```
docker-compose -f docker-compose.production.yml up -d
```

and open `localhost` in browser.

## Testing production setup locally (w/ swarm)

Create a couple vms according to here: https://docs.docker.com/get-started/part4/#create-a-cluster

Make a `web.production.env` file from `web.env.example`

Then copy prod yml file and web.production.env

`docker-machine scp docker-compose.production.yml myvm1:~`
`docker-machine scp web.production.env myvm1:~`

Then deploy
`docker-machine ssh myvm1 "docker stack deploy -c docker-compose.production.yml soundproud"`

It seems like right now you have to restart nginx manually, one way is to
`docker-machine ssh myvm1`
`docker service scale soundproud_nginx=0`
`docker service scale soundproud_nginx=1`

Then find ip of one of vms and open in browser.

## Deploying (w/ swarm)

TODO

## Tests

Javascript (in assets container):
```
npm run test
```

Unit/Integration:
```
./manage.py test --keepdb
```

Acceptance:
```
./manage.py test --keepdb acceptance_tests
```
