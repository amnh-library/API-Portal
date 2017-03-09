var fetch = require('node-fetch');

/**
 * ArchivesSpace Data Controller
 */

const SOURCE = 'archives-space';
const SEARCH_BASE = 'http://lbry-web-006.amnh.org:8089/repositories/3/search?page=1';
const SESSION_HEADER = 'X-ArchivesSpace-Session';
const PEOPLE_QUERYSTRING = 'filter_term%5B%5D=%7B"primary_type"%3A"agent_person"%7D';
const LOGIN_BASE = 'http://lbry-web-006.amnh.org:8089/users/ehammer/login';
const LOGIN_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};

const sessionCache = {session: null};

const _getQuery = query => query.split(' ').join(' AND ');

const getResults = json => json.results.map(r => {
  const newResult = Object.assign({}, r, {source: SOURCE});
  if (newResult.hasOwnProperty('json')) {
    newResult.json = JSON.parse(newResult.json);
  }
  return newResult;
});

const getSearchOptions = session => {
  const options = {};
  options.headers = {};
  options.headers[SESSION_HEADER] = session;
  return options;
};

const login = () => (
  fetch(`${LOGIN_BASE}`, {
    method: 'POST',
    body: 'password=hackathon',
    headers: LOGIN_HEADERS,
  })
    .then(res => res.json())
    .then(json => {
      sessionCache.session = json.session;
    })
);

const people = query => {
  if (sessionCache.session === null) {
    return login().then(() => people(query));
  }
  const options = getSearchOptions(sessionCache.session);
  return fetch(
    `${SEARCH_BASE}&q=${_getQuery(query)}&${PEOPLE_QUERYSTRING}`,
    options
  )
    .then(res => {
      if (res.status === 403) {
        sessionCache.session = null;
        return people(query);
      }
      return res.json();
    })
    .then(getResults);
};

const search = query => {
  if (sessionCache.session === null) {
    return login().then(() => people(query));
  }
  const options = getSearchOptions(sessionCache.session);
  return fetch(`${SEARCH_BASE}&q=${_getQuery(query)}`, options)
    .then(res => {
      if (res.status === 403) {
        sessionCache.session = null;
        return search(query);
      }
      return res.json();
    })
    .then(getResults);
};

exports.people = people;
exports.search = search;
