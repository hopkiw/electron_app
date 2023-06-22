const { Tag } = require('../models/index.cjs');
module.exports = {
  async getTags() {
    const res = await Tag.findAll();
    return res;
  },
  async getTagById(id) {
    const res = await Tag.findByPk(id);
    return res;
  },
  async getTagByName(id) {
    const res = await Tag.findOne({ where:{ name: name }});
    return res;
  },
  async newTag(name) {
    const tag = await Tag.findOne({where: {name: name}});
    if (tag) {
      console.log("returning existing tag");
      return tag
    }
    const res = await Tag.create({name});
    return res;
  },
  async deleteTag(id) {
    const res = await Tag.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },
  // As of now tags only have a single field, name, so these are unused.
  async updateTag() {
    const res = await Tag.update();
    return res;
  },
  async replaceTag() {
    const res = await Tag.update();
    return res;
  },
}

