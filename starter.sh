#!/bin/sh  
cd ./client
npm install
npm run build
cd ../
cp -r ./client/prod/* ./server/public/
rm ./server/public/index.html
cp -r ./client/prod/index.html ./server/view/
docker-compose up -d