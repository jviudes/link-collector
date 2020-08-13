# link-collector app

Service receives a url go through the page's html and finds all urls contained in it. Repeats the process for the urls found in the first step.

## Setups

To run the project it is assumed you have Docker installed alongside with Docker Compose. Instructions on how to install these requirements could be found here:

- https://docs.docker.com/engine/install/
- https://docs.docker.com/compose/install/

## Run

Just run the command bellow on the project folder and the application will be up:
  
 sudo docker-compose up

To bring the application down run:

    sudo docker-compose down

## About

After the run command the application will be available on port 3000

API documentation are available on the browser in:

    localhost:3000/api-docs

The routes can also be tested on the documentation page.
