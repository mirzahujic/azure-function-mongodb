# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node18-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node18

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot

RUN apt-get update
RUN apt-get -y install sudo
RUN apt-get -y install vim
RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

RUN cd /home/site/wwwroot && \
    npm install && \
    npm run build