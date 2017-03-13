var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var _ = require('lodash');

// Import the API controllers
var omeka = require('../controllers/omeka');
var aspace = require('../controllers/aspace');
var dspace = require('../controllers/dspace');
var sierra = require('../controllers/sierra');
var snac = require('../controllers/snac');
var wordpress = require('../controllers/wordpress');
var xeac = require('../controllers/xeac');
var csv = require('../controllers/csv');

const check = (object, path) => typeof _.at(object, path)[0] !== 'undefined';

const formatSearchResponse = (type, obj, results) => {
  const response = {};
  response[type] = obj;
  response.results = results;
  return response;
};

const filterQueryParams = (params) => (entity) => {
  return Object.keys(params).every((key) => {
    if (typeof params[key] !== 'string') return params[key] === entity[key];
    return entity[key].toLowerCase().includes(params[key].toLowerCase());
  });
};

const search = (query) => {
  return Promise.all([
    aspace.search(query),
    omeka.imageSearch(query),
    dspace.search(query),
    omeka.search(query),
    sierra.search(query),
    xeac.search(query)
  ]).then(responses => [].concat.apply([], responses));
};

router.get('/search', function (req, res, next) {
  if (!req.query.q) {
    return res.json([]);
  }
  const query = req.query.q;
  search(query).then(results => res.json(results));
});

router.get('/people', (req, res, next) => {
  csv
    .getPeople()
    .then(people => people.filter(filterQueryParams(req.query)))
    .then(people => res.json(people));
});

router.get('/people/:id', (req, res, next) => {
  let finalPerson = null;
  xeac
    .getPerson(req.params.id)
    .then(person => {
      if (check(person, 'name.first') && check(person, 'name.first')) {
        finalPerson = person;
        return `${person.name.first} ${person.name.last}`;
      }
      return csv
        .getPeople()
        .then(people => people.filter(filterQueryParams({ id: req.params.id })))
        .then(people => people[0])
        .then(person => {
          finalPerson = person;
          return person.name;
        })
    })
    .then(fullName => search(fullName))
    .then(results => res.json(
      formatSearchResponse('person', finalPerson, results)
    ));
});

router.get('/expeditions', (req, res, next) => {
  csv
    .getExpeditions()
    .then(expeditions => expeditions.filter(filterQueryParams(req.query)))
    .then(expeditions => res.json(expeditions));
});

router.get('/expeditions/:id', (req, res, next) => {
  let finalExpedition = null;
  xeac
    .getExpedition(req.params.id)
    .then(expedition => {
      if (check(expedition, 'name')) {
        return expedition;
      }
      return csv
        .getExpeditions()
        .then(expeditions => expeditions.filter(filterQueryParams({ id: req.params.id })))
        .then(expeditions => expeditions[0])
    })
    .then(expedition => finalExpedition = expedition)
    .then(expedition => search(expedition.name))
    .then(results => res.json(
      formatSearchResponse('expedition', finalExpedition, results)
    ));
});

router.get('/exhibitions', (req, res, next) => {
  csv
    .getExhibitions()
    .then(exhibitions => exhibitions.filter(filterQueryParams(req.query)))
    .then(exhibitions => res.json(exhibitions));
});

router.get('/exhibitions/:id', (req, res, next) => {
  let finalExhibition = null;
  csv
    .getExhibitions()
    .then(exhibitions => exhibitions.filter(filterQueryParams({ id: req.params.id })))
    .then(exhibitions => exhibitions[0])
    .then(exhibition => {
      if (!exhibition.permanent) return exhibition;
      return xeac.getExhibition(exhibition.id);
    })
    .then(exhibition => finalExhibition = exhibition)
    .then(exhibition => search(exhibition.name))
    .then(results => res.json(
      formatSearchResponse('exhibition', finalExhibition, results)
    ));
});

router.get('/departments', (req, res, next) => {
  csv
    .getDepartments()
    .then(departments => departments.filter(filterQueryParams(req.query)))
    .then(departments => res.json(departments));
});

router.get('/departments/:id', (req, res, next) => {
  let finalDepartment = null;
  xeac
    .getDepartment(req.params.id)
    .then(department => {
      if (check(department, 'name')) {
        return department;
      }
      return csv
        .getDepartments()
        .then(departments => departments.filter(filterQueryParams({ id: req.params.id })))
        .then(departments => departments[0])
    })
    .then(department => finalDepartment = department)
    .then(department => search(department.name))
    .then(results => res.json(
      formatSearchResponse('department', finalDepartment, results)
    ));
});

router.get('/resources/sierra', function (req, res, next) {
  sierra
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

router.get('/resources/omeka', function (req, res, next) {
  omeka
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

router.get('/images', function (req, res, next) {
  omeka
    .imageSearch(req.query.q)
    .then(results => res.json(results));
});

router.get('/resources/archives-space', function (req, res, next) {
  aspace
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

router.get('/resources/dspace', function (req, res, next) {
  dspace
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

module.exports = router;
