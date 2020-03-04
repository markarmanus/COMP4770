#!/bin/bash

docker volume create --name=mongodata

docker run --name mongodb -v mongodata:/data/db -d -p 27010:27010 mongo

docker exec -it mongodb bash
