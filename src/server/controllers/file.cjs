const { File, Tag } = require('../models/index.cjs');
module.exports = {
  async deleteFile(id) {
    const res = await File.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },

  async getFiles() {
    const res = await File.findAll({
      attributes: ["name", "id"],
    });
    return res;
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
    const file = await File.findOne({where: {name: name}});
    if (file) {
      return {};
    }
    const res = await File.create({name});
    return res;
  },

  async replaceFile(id, file) {
    const existing = await File.findByPk(id, { include: Tag });
    const updated = existing.set(file);
    updated.save();
    return await updated.setTags(file.Tags);
  },
}
