# Web3 Renewables - EC2 Instance Setup

## Background
The server code is loaded onto the EC2 instance using a docker container.

## (EC2) First Time Setup

1. Create a new EC2 instance on the AWS Console. For these purposes we will be using a `T3 Small` running `Amazon Linux`.
3. Start the EC2 instance and ssh into it.
4. Once SSHed into it, install docker:
```bash
yum install docker
```
5. In the users home directory, create a folder to hold docker images
```bash
mkdir server_container
```
6. Once docker is installed, follow the `Setting up files for EC2` steps to load the docker image.
7. When finished, `turn off` the EC2 instance. This is because the scripts will run after the EC2 instance starts. AWS Lambda functions will control when the instance starts. In case the instance does not turn itself off, an AWS Lambda function will be used to turn off the instance after 6 hours in case anything goes wrong.
8. When ready to start the service, goto the instance settings, then `Advanced Details`, and then the `User` section to paste the following:
```
#!/bin/bash
sudo systemctl start docker
docker run web3-renewables-server-prod:latest
sudo shutdown -h now
```
This script will start docker on the instance, run the docker image, then turn off the instance when finished.

## Setting up files for EC2
### Local Machine
1. If building for `production`, ensure that a `.env.production` file exists, all keys have values, and it exists in the root of the `server` directory. This file will be bundled with the production docker container. In addition, if building for development, ensure the same requirements exist for `.env.local`.

3. Run the script to generate a zip of all required files for the EC2 instance. `zip_dev.sh` will only include the `.env.local` and `zip_prod.sh` will only include the `.env.prod`. Both commands exclude the `node_modules` folder while zipping. Use `zip_dev.sh` if building for development.
#### MacOS
```bash
source zip_server.sh -prod
```
4. In the EC2 instance settings on the AWS Console, right click on the instance, then click `Instance Setttings` > `Edit user data`. Here, remove the existing script and save. Then turn on the `EC2` instance. This is required to prevent the default functionality on EC2 startup.
4. Copy the zipped file onto the EC2 instance (Switch to `dev` if desired)
```bash
rsync -e 'ssh -i <PEM_FILE_LOCATION>' ./build/web3renewables_server_prod.zip ec2-user@<EC2_URL>:~/server_container/web3renewables_server_prod.zip
```
### EC2 Instance (Build Docker Image)
5. Change directory to `server_container` and unzip the file:
```bash
cd server_container
unzip web3renewables_server_prod.zip
```
6. CD into the unzipped directory
```
cd server
```
7. Start Docker if not already started
```bash
sudo systemctl start docker
```
8. Remove previously created containers and images.
```bash
sudo docker container prune
sudo docker image rm web3-renewables-server-prod
```
8. Building the Docker Image for Production (change `prod` to `dev` if need development environment)
```bash
sudo docker build -f dockerfile-prod -t web3-renewables-server-prod .
```