'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('goods', {
    id: { type: 'int', autoIncrement: true, primaryKey: true },
    title: { type: 'string', length: 64, primaryKey: true },
    price: { type: 'float', primaryKey: true },
  });
};

exports.down = function(db) {
  return db.dropTable('goods');
};

exports._meta = {
  "version": 1
};
