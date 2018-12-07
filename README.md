## Sayat (Nova)

A __tiny__, _zero_ _dependency_ package to make managing __Docker__ __Compose__ Stacks a bit more managable when you have a _hella_ lot of containers.

#### Features
- including external `docker-compose` files via a comment directive:   
`#include external-service.yml`
- path aliases via a comment directive:   
`#@src:/srv/app/`

#### Run
`sayat docker-compose.yml | -f <command>`