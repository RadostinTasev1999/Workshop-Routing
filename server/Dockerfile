FROM node:22
# https://hub.docker.com/_/node
# based on image with installed node.js version 22
ENV PORT = 8080

WORKDIR /user/src/app
# this is the working directory in the image.The folder in Linux in which we will locate the app.

COPY . .
# copy everything from the current folder to the working directory folder

EXPOSE 8080
# port on which the container will expose the application

CMD ["node","server"]
