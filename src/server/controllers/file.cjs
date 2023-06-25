const { File, Tag, sequelize } = require('../models/index.cjs');
const { Op } = require("sequelize");

module.exports = {
  async deleteFile(id) {
    const res = await File.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },

  async getFiles(tags, notTags) {
    const opts = {
      attributes: ["name", "id"],
    }
    if (tags) {
      opts.include = {
        model: Tag,
        attributes: [],
        where: { name: tags },
        through: { attributes: [], }
      }
      if (tags.length > 1) {
        opts.group = "File.name"
        opts.having = sequelize.where(
          sequelize.fn('count', sequelize.col('File.name')), 
          tags.length
        )
      }
    }

    const result = await File.findAll(opts);
    if (notTags) {
      const badFiles = await File.findAll({
        include: {
          model: Tag,
          attributes: ['id'],
          where: { name: notTags },
        }
      });
      const badFileIds = badFiles.map((x) => x.id);
      const newres = result.filter(item => !badFileIds.includes(item.id))
      return newres;
    }
    return result;
  },

  async getFileById(id, withTags) {
    const opts = {
      attributes: ["name", "id"],
    }
    if (withTags) {
      opts.include = {
        model: Tag,
        attributes: ["name", "id"],
        through: { attributes: [] }
      }
    }
    const res = await File.findByPk(id, opts);
    return res;
  },

  async getFileByName(name, withTags) {
    const opts = {
      attributes: ["name", "id"],
      where: { name: name }
    }
    if (withTags) {
      opts.include = {
        model: Tag,
        attributes: ["name", "id"],
        through: { attributes: [] }
      }
    }
    const res = await File.findOne(opts);
    return res;
  },

  async newFile(name) {
    const res = await File.create({name}, {ignoreDuplicates: true});
    return res;
  },

  async updateFile(existing, file) {
    const updated = await existing.update(file);
    return await updated.setTags(file.Tags);
  },
}
