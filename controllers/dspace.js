var fetch = require('node-fetch');
var elasticSearch = require('./elasticSearch.js');

/**
 * DSpace Data Controller
 */

const SOURCE = 'dspace';
const SEARCH_PATHS = [
  'dspace_item',
  'dspace_collection',
  'dspace_communitie',
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

exports.search = search;
