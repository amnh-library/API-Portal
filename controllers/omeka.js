var fetch = require('node-fetch');
var elasticSearch = require('./elasticSearch.js');

/**
 * omeka Data Controller
 */

const SOURCE = 'omeka';
const SEARCH_PATHS = [
  'omeka_item',
  'omeka_exhibit_page',
//  'collection',
//  'exhibit',
//  'element',
];
const SIZE = 200;

const search = query => {
  const uris = elasticSearch.getSearchURIs(SEARCH_PATHS);
  return Promise.all(uris.map(uri => (
    fetch(uri, elasticSearch.getOptions(query, SIZE))
  )))
    .then(resList => Promise.all(resList.map(res => res.json())))
    .then(jsonList => elasticSearch.getResults(jsonList, SOURCE));
};

const imageSearch = query => {
  const uris = elasticSearch.getSearchURIs(SEARCH_PATHS);
  return Promise.all(uris.map(uri => (
    fetch(uri, elasticSearch.getOptions(query, SIZE))
  )))
    .then(resList => Promise.all(resList.map(res => res.json())))
    .then(jsonList => elasticSearch.getResults(jsonList, SOURCE))

    .then(results => {
      var tArr = [];
      for(e in results) {
        if(results[e]._source.files) {
          tArr.push(results[e]._source.files.url);
        }
      }
      return tArr;
    })
    .then(urlArr => {
      var imageArr = [];
      var promArr = [];
      for(url of urlArr) {
        var promise = fetch(url)
          .then(res => {
            return res.json();
          })
          .then(json => {
            if(json[0]) {
              imageArr.push(json[0].file_urls.original);
            }
          });
        promArr.push(promise);
      }
      return Promise.all(promArr).then( () => imageArr);
    })
    .then(_images => {return _images});
}

exports.search = search;

exports.imageSearch = imageSearch;

