# To make the build 
Go on digital ocean and set 2gb ram memory
```bash
ssh root@167.99.196.145
cd casaPetri
git pull
ng build
```
To START the project(in background) run:
```bash
pm2 start dist/server.js
```
To STOP the project(in background) run:
```bash
pm2 stop all
```
# On angular update
 Make sure you have latest node
 ```bash
nvm list
nvm alias default 12.16.0
nvm use 12.16.0
ng update
ng version
 ```
