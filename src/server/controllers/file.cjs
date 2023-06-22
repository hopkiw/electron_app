const { File } = require('../models/index.cjs');
module.exports = {
  async getFiles() {
    const res = await File.findAll();
    return res;
  },
  async getFileById(id) {
    const res = await File.findByPk(id);
    return res;
  },
  async getFileByName(id) {
    const res = await File.findOne({ where:{ name: name }});
    return res;
  },
  async newFile(name) {
    const file = await File.findOne({where: {name: name}});
    if (file) {
      console.log("returning existing file");
      return file;
    }
    const res = await File.create({name});
    return res;
  },
  async deleteFile(id) {
    const res = await File.findByPk(id);
    if (res) {
      return res.destroy();
    }
  },
  async updateFile(id, tags) {
    console.log("looking for id", id);
    const file = await File.findByPk(id);
    if (!file) {
      console.log("whoops no file");
      // do some kind of error handling?
      return {};
    }
    const existing = await file.getTags();

    return existing;
  },
  // As of now files only have a single field, name, so this is unused.
  async replaceFile() {
    const res = await File.update();
    return res;
  },
}
