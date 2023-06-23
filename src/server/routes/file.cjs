const fileController = require('../controllers/file.cjs');
module.exports = {
  async deleteFile(req, res) { 
    const result = await fileController.deleteFile(req.params.id);
    res.send({ message: "deleteFile", result: result });
  },

  async getFiles(req, res) { 
    const result = await fileController.getFiles();
    res.send({ message: "getFiles", result: result });
  },

  async getFile(req, res) { 
    const result = await fileController.getFileById(req.params.id, true);
    res.send({ message: "getFile", result: result });
  },

  async newFile(req, res) { 
    if (!req.body || !req.body.name) {
      res.sendStatus(400)
      return
    }
    const result = await fileController.newFile(req.body.name);
    res.send({ message: "newFile", result: result });
  },

  async replaceFile(req, res) { 
    const result = await fileController.replaceFile(req.params.id, req.body);
    res.send({ message: "replaceFile", result: result });
  },
}
