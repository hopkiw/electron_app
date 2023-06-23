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
  async getTagByName(name) {
    const res = await Tag.findOne({ where:{ name: name }});
    return res;
  },
  async deleteTag(id) {
    const res = await Tag.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },
  async replaceTag() {
    const res = await Tag.update();
    return res;
  },
}

