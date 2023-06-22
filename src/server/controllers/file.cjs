const { File, Tag } = require('../models/index.cjs');
module.exports = {
  async getFiles() {
    const res = await File.findAll({
      attributes: ["name", "id"],
    });
    return res;
  },
  async getFileById(id, withTags) {
    console.log("you asked for", id, "withTags:", withTags);
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
  async getFileByName(id, withTags) {
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
      // TODO: error
      return {};
    }
    const res = await File.create({name});
    return res;
  },
  async deleteFile(id) {
    const res = await File.findByPk(id);
    if (res) {
      return res.destroy();
    }
    // TODO: error
  },
  async updateFile(id, tags) {
    const file = await File.findByPk(id);
    if (!file) {
      // TODO: error
      return {};
    }
    const existing = await file.getTags();
    const result = await file.addTags(tags);

    return result;
  },
  // As of now files only have a single field, name, so this is unused.
  async replaceFile() {
    const res = await File.update();
    return res;
  },
}
