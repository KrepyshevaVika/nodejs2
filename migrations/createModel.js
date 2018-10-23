'use strict';
const db = require('../models/index.js');

function createArrayOfPromise(queryInterface) {
  let arr = [];
  Object.keys(db).forEach(modelName => {
    if (modelName != 'sequelize' && modelName != 'Sequelize')
      arr.push(queryInterface.createTable(db[modelName].tableName, db[modelName].attributes));
  });
  return arr;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      createArrayOfPromise(queryInterface)
    ).then(() => queryInterface.sequelize.query(`CREATE FUNCTION trigger_change_count_child_after_ins()
    RETURNS trigger AS
    $BODY$
    DECLARE
        tmp node%ROWTYPE;
    BEGIN
      SELECT * INTO tmp FROM node WHERE id = NEW.node_id;
    
      tmp.count_child = tmp.count_child + 1;
      
      UPDATE node
      SET count_child = tmp.count_child
      WHERE id = NEW.node_id; 
      
      return NEW;
    END;
    $BODY$
      LANGUAGE plpgsql;`)
    ).then(() => queryInterface.sequelize.query(`CREATE TRIGGER change_count_child_after_ins
    AFTER INSERT ON node FOR EACH ROW  
    EXECUTE PROCEDURE trigger_change_count_child_after_ins();`)
    ).then(() => queryInterface.sequelize.query(`CREATE FUNCTION trigger_change_count_child_after_del()
    RETURNS trigger AS
    $BODY$
    DECLARE
        tmp node%ROWTYPE;
    BEGIN
      SELECT * INTO tmp FROM node WHERE id = OLD.node_id;
    
      tmp.count_child = tmp.count_child - 1;
      
      UPDATE node
      SET count_child = tmp.count_child
      WHERE id = OLD.node_id; 
    
      return OLD;
    END;
    $BODY$
      LANGUAGE plpgsql;`)
    ).then(() => queryInterface.sequelize.query(`CREATE TRIGGER change_count_child_after_del
    AFTER DELETE ON node FOR EACH ROW  
    EXECUTE PROCEDURE trigger_change_count_child_after_del();`)
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('node')
    .then(() => queryInterface.dropTable('node_type'))
    .then(() => queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS trigger_change_count_child_after_ins() CASCADE;`))
    .then(() => queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS trigger_change_count_child_after_del() CASCADE;`));
  }
};


//миграция существующей базы данных
/*queryInterface.sequelize.query("ALTER TABLE node
  ADD user_group_id_fkey text;*/

  /*queryInterface.createTable(NodeTypes.tableName, NodeTypes.attributes)
    .then(() => queryInterface.createTable(NetworkNode.tableName, NetworkNode.attributes))
    .then(() => queryInterface.sequelize.query(`CREATE FUNCTION trigger_change_count_child_after_ins()
    RETURNS trigger AS
    $BODY$
    DECLARE
        tmp node%ROWTYPE;
    BEGIN
      SELECT * INTO tmp FROM node WHERE id = NEW.node_id;
    
      tmp.count_child = tmp.count_child + 1;
      
      UPDATE node
      SET count_child = tmp.count_child
      WHERE id = NEW.node_id; 
      
      return NEW;
    END;
    $BODY$
      LANGUAGE plpgsql;`)
    ).then(() => queryInterface.sequelize.query(`CREATE TRIGGER change_count_child_after_ins
    AFTER INSERT ON node FOR EACH ROW  
    EXECUTE PROCEDURE trigger_change_count_child_after_ins();`)
    ).then(() => queryInterface.sequelize.query(`CREATE FUNCTION trigger_change_count_child_after_del()
    RETURNS trigger AS
    $BODY$
    DECLARE
        tmp node%ROWTYPE;
    BEGIN
      SELECT * INTO tmp FROM node WHERE id = OLD.node_id;
    
      tmp.count_child = tmp.count_child - 1;
      
      UPDATE node
      SET count_child = tmp.count_child
      WHERE id = OLD.node_id; 
    
      return OLD;
    END;
    $BODY$
      LANGUAGE plpgsql;`)
    ).then(() => queryInterface.sequelize.query(`CREATE TRIGGER change_count_child_after_del
    AFTER DELETE ON node FOR EACH ROW  
    EXECUTE PROCEDURE trigger_change_count_child_after_del();`)
    );*/