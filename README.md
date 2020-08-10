# link-collector service

### Service receives a url, strips the html and finds all urls contained in it. After that follows the urls found in the first step.

## Run the project

    sudo docker-compose up

## Methods
### GET
Return all urls saved in the database

    localhost:3000/
Return a specific url if it exists or start crawling and return found links
    
    localhost:3000/?url=https://example.com

### DELETE
Delete specific url from the database

     localhost:3000/?url=https://example.com