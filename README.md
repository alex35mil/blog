# alexfedoseev.com

[ __WIP__ ]

## Development

I use `alexfedoseev.dev` domain for local development, so this needs to be added to `/etc/hosts`:

```
fe80::1%lo0  alexfedoseev.dev
127.0.0.1    alexfedoseev.dev
fe80::1%lo0  hot.alexfedoseev.dev
127.0.0.1    hot.alexfedoseev.dev
fe80::1%lo0  www.alexfedoseev.dev
127.0.0.1    www.alexfedoseev.dev
```

Then run `yarn start` (docker will build development services) and visit `alexfedoseev.dev`.

To test production builds run `yarn run local:production`.

## Docker

2 services:
* web
* nginx

Development containers:

```bash
/
  www/
    |-- deps/             # web: dependencies cache
    |-- public/           # volume: generated client assets
    |-- src/              # host -> web: app sources
        |-- build/        #              server app build
        |-- node_modules/ #              dependencies
  etc/
    |-- nginx/            # nginx: configs
    |-- ssl/              # nginx: self-signed certificate

```

Production containers:

```bash
/
  www/
    |-- deps/             # web: dependencies cache
    |-- public/           # volume: generated client assets
    |-- src/              # web: app sources
        |-- build/        #      server app build
        |-- node_modules/ #      dependencies
    |-- letsencrypt/      # host -> nginx: dummy entrypoint to obtain a SSL cert
  etc/
    |-- nginx/            # nginx: configs
    |-- letsencrypt/      # host -> nginx: SSL certs

```


## SSL

### Self-signed certificate for local development
Generate self-signed wildcard certificate for local development (commited for `*.alexfedoseev.dev`):

```bash
openssl genrsa 2048 > alexfedoseev.dev.key
openssl req -new -x509 -nodes -sha1 -days 3650 -key alexfedoseev.dev.key > alexfedoseev.dev.crt

# Enter `*.alexfedoseev.dev` as "Common Name"

openssl x509 -noout -fingerprint -text < alexfedoseev.dev.crt > alexfedoseev.dev.info
cat alexfedoseev.dev.crt alexfedoseev.dev.key > alexfedoseev.dev.pem
```

### LetsEncrypt for production
Obtain a cert from LetsEncrypt (run against production host):

```
docker run \
  -it \
  --rm \
  --name certbot \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/www/letsencrypt:/www/letsencrypt" \
  certbot/certbot \
  certonly \
  -d alexfedoseev.com \
  -d www.alexfedoseev.com \
  --webroot \
  --webroot-path /www/letsencrypt
```
