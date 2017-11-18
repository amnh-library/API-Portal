var { Converter } = require('csvtojson');
var Promise = require('promise');
var fs = require('fs');
var path = require('path');

const mapEntity = (entities) => {
  return entities.map(entity => {
    entity.id = entity['xeac_id'];
    delete entity['xeac_id'];
    return entity;
  });
};

const getCSV = (entity) => (query = {}) => {
  const converter = new Converter({});
  const promise = new Promise((fulfill, reject) => {
    converter.fromFile(path.join(__dirname, `../data/${entity}.csv`), (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    });
  });
  return promise.then(mapEntity);
};

exports.getPeople = getCSV('person');
exports.getExpeditions = getCSV('expedition');
exports.getExhibitions = getCSV('exhibition');
exports.getDepartments = getCSV('department');
exports.getHalls = getCSV('halls');
