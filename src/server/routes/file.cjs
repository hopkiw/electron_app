const fileController = require('../controllers/file.cjs');
module.exports = {
  // DELETE /files/:id
  async deleteFile(req, res) { 
    const result = await fileController.deleteFile(req.params.id);
    res.send({ message: "deleteFile", result: result });
  },

  // GET /files
  async getFiles(req, res) { 
    const result = await fileController.getFiles(req.query.tags);
    res.send({ message: "getFiles", request: req.query, result: result });
  },

  // GET /files/:id
  async getFile(req, res) { 
    const result = await fileController.getFileById(req.params.id, true);
    res.send({ message: "getFile", result: result });
  },

  // POST /files
  async newFile(req, res) { 
    if (!req.body || !req.body.name) {
      res.sendStatus(400)
      return
    }
    const result = await fileController.newFile(req.body.name);
    if (result.id == 0){
      res.sendStatus(400)
      return
    }
    res.send({ message: "newFile", result: result });
  },

  // PUT /files/:id
  async replaceFile(req, res) { 
    const existing = await fileController.getFileById(req.params.id);
    if (!existing) {
      res.sendStatus(400)
      return
    }
    const result = await fileController.updateFile(existing, req.body);
    res.send({ message: "replaceFile", result: result });
  },
}
