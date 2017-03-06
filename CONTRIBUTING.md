# Running The API Locally

1. Install the latest version of node and npm
2. `git clone git@github.com:amnh-library/API-Portal.git`
3. `npm install`
4. `npm start`

To start the server (step 4):

> **npm start**

*OR for development*

> **npm install -g pm2**

> **pm2 start npm --name "LibraryAPI" -- start --watch**

Make a GET request to any of the end points.
[Postman](https://www.getpostman.com/) works well for testing.

## Technologies

- [Node](https://nodejs.org/en/) - javascript runtime environment used for server applications
- [Express](http://expressjs.com/) - node's most popular web framework
- [node-fetch](https://github.com/bitinn/node-fetch) - communicates with other APIs
- [xml2json](https://github.com/buglabs/node-xml2json) - javascript library for converting XML data to JSON format
- [Moment](http://momentjs.com/) - parsing and displaying dates and times
- [Lodash](https://lodash.com/) - one of the most populate javascript utility libraries
- [Elasticsearch](https://www.elastic.co/products/elasticsearch) - Lucene based search engine
- [Python](https://www.python.org/) - programming language we're using for scraping the databases
