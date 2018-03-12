#### fuzzy-enigma
  backend for reachaf
  ##### development
  1. install docker
  2. docker-compose up
  
  ##### deploy
  currently hooked up to docker-machine called aws02
  ```
    eval $(docker-machine env aws02)
    docker-compose -f docker-compose.prod.yml --build -d
  ```

