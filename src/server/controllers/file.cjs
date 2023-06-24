const { File, Tag } = require('../models/index.cjs');
module.exports = {
  async deleteFile(id) {
    const res = await File.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },

  async getFiles(tags) {
    const opts = {
      attributes: ["name", "id"],
    }
    if (tags) {
      opts.where = {
        '$Tags.name$': tags,
      },
      opts.include = {
        model: Tag,
        attributes: [],
        through: { attributes: [], }
      }
    }
    return await File.findAll(opts);
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
