const tagController = require('../controllers/tag.cjs');
module.exports = {
  async deleteTag(req, res) { 
    const result = await tagController.deleteTag(req.params.id);
    res.send({ message: "deleteTag", result: result });
  },

  async getTags(req, res) { 
    const result = await tagController.getTags();
    res.send({ message: "getTags", result: result });
  },

  async getTag(req, res) { 
    const result = await tagController.getTagById(req.params.id);
    res.send({ message: "getTag", result: result });
  },

  async newTag(req, res) { 
    if (!req.body || !req.body.name) {
      res.sendStatus(400);
      return;
    }
    const result = await tagController.newTag(req.body.name);
    res.send({ message: "newTag", result: result });
  },

  async replaceTag(req, res) { 
    const result = await tagController.replaceTag(req.params.id, req.body);
    res.send({ message: "replaceTag", result: result });
  },
}
