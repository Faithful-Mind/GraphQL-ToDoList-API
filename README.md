# GraphQL-ToDoList-API

## How to run 
### Windows
make sure you have Node.js & MongoDB environments ready. Then run
```shell
npm i && npm start
```
in the project folder

## Docker
Run 
```shell
docker-compose up -d
```
or you can specify tag name and build images by yourself. Then run with MongoDB hostname by
```shell
docker run --name api -p 3000:3000 -e MONGO_SERVER=<mongodb-hostname> -it <image-name>
```
