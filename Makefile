mongo:
   docker run --name mydb -d -p 27017:27017 mongo:4.2
   docker exec -it mydb bash