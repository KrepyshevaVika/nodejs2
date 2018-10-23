'use strict';
module.exports = function (sequelize, DataTypes) {
  const NodeTypes = sequelize.define('node_type', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_endpoint: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    underscored: true,
    tableName: 'node_type',
  });

  //NodeTypes.sync();

  return NodeTypes;
};