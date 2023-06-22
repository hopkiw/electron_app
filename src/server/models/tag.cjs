'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.File, { through: 'FileTag' });
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};

/*

import { Model } from 'sequelize';

export default function Tag(sequelize, DataTypes) {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.File, { through: 'FileTag' });
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};

*/
