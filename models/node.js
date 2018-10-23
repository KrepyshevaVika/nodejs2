'use strict';
module.exports = function (sequelize, DataTypes) {
  const NetworkNode = sequelize.define('node', {
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
    description: {
      type: DataTypes.TEXT,
    },
    ip_adress: {
      type: DataTypes.STRING,
    },
    web_port: {
      type: DataTypes.INTEGER,
    },
    count_child: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'node_type',
        id: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    node_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'node',
        id: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    createdAt: false,
    updatedAt: false,
    underscored: true,
    tableName: 'node',
  });

 // NetworkNode.sync();

  return NetworkNode;
};
