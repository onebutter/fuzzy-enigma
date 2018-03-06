#### fuzzy-enigma
  backend for reachaf
  deploy
  currently hooked up to docker-machine called aws02
  ```
    eval $(docker-machine env aws02)
    docker-compose -f docker-compose.prod.yml --build -d
  ```

