# Frontend for pplmap

git push https://otmjka@github.com/otmjka/pplmap-frontend.git/

## TODO

1. research: folders structure

## deploy on heroku

```bash

docker build -t pplmp-frontend .
heroku container:push web
heroku container:release web

```

.dockerignore
Dockerfile
default.conf.template
heroku.yml
nginx.conf
