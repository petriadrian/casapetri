# Make the build 
```bash
ssh root@167.99.196.145
./deploy.sh
```
# On angular update
 Make sure you have latest node
 ```bash
pm2 stop all
nvm list
nvm alias default 12.16.0
nvm use 12.16.0
ng update
ng version
 ```
