# Main instruction

1. Install Docker
2. Clone this repo
3. Run command - docker-compose up -d
4. After containers was running run command - sudo docker exec container-server sh -c "npm run migrate"
   this need for creation structure in PG container
5. Run command - sudo docker exec container-server sh -c "npm run seed"
   this need for creation some initial data
6. Go to http://localhost:3000

DB diagram:
![screenshot](./info/DB-diagram.png)

Small video

[![Watch the video](./info/DB-diagram.png)](https://drive.google.com/file/d/1xAw-UBUK_6SyWNweUaLcQW2Ce9CPjvbv/view?usp=sharing)
