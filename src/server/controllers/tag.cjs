const { File, Tag } = require('../models/index.cjs');
module.exports = {
  async deleteTag(id) {
    const res = await Tag.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },

  async getTags(files) {
    const opts = {
      attributes: ["name", "id"],
    }
    if (files) {
      opts.where = {
        '$Files.name$': files,
      },
      opts.include = {
        model: File,
        attributes: [],
        through: { attributes: [], }
      }
    }
    return await Tag.findAll(opts);
  },

  async getTagById(id, withTags) {
    const opts = {
      attributes: ["name", "id"],
    }
    if (withTags) {
      opts.include = {
        model: File,
        attributes: ["name", "id"],
        through: { attributes: [] }
      }
    }
    const res = await Tag.findByPk(id, opts);
    return res;
  },

  async getTagByName(name, withFiles) {
    const opts = {
      attributes: ["name", "id"],
      where: { name: name }
    }
    if (withFiles) {
      opts.include = {
        model: File,
        attributes: ["name", "id"],
        through: { attributes: [] }
      }
    }
    const res = await Tag.findOne(opts);
    return res;
  },

  async newTag(name) {
    const res = await Tag.create({name}, {ignoreDuplicates: true});

    return res;
  },

  async updateTag(existing, tag) {
    const updated = existing.update(tag);
    return await updated.setFiles(tag.Files);
  },
}
