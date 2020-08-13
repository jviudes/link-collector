# link-collector app

Service receives a url go through the page's html and finds all urls contained in it. Repeats the process for the urls found in the first step.

## Setup

To run the project it is assumed you have Docker installed alongside with Docker Compose. Instructions on how to install these requirements could be found here:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Run

Just run the command bellow on the project folder and the application will be available on port 3000

     sudo docker-compose up

To bring the application down run

    sudo docker-compose down

## About

Routes can be tested on the documentation page. The API documentation are available on the browser in:

    localhost:3000/api-docs
